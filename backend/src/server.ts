import Fastify from "fastify"
import cors from "@fastify/cors"
import { ZodError } from "zod"

import { env } from "./config/env"
import { healthRoutes } from "./routes/health"
import { profileRoutes } from "./routes/profiles"
import { experienceRoutes } from "./routes/experiences"
import { educationRoutes } from "./routes/educations"
import { skillRoutes } from "./routes/skills"
import { resumeRoutes } from "./routes/resumes"
import { paymentRoutes } from "./routes/payments"

export function buildServer() {
  const app = Fastify({ logger: true })

  // CORS — libera o frontend local (Vite).
app.register(cors, {
  origin: (origin, callback) => {
    if (
      !origin ||
      origin.includes("localhost") ||
      origin.includes("vercel.app")
    ) {
      callback(null, true)
      return
    }

    callback(new Error("Not allowed by CORS"), false)
  },
})

  // Tratamento de erros consistente.
  app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
      return reply.code(400).send({
        error: "validation_error",
        issues: error.flatten().fieldErrors,
      })
    }
    const statusCode = (error as { statusCode?: number }).statusCode ?? 500
    if (statusCode >= 500) request.log.error(error)
    const message = error instanceof Error ? error.message : "Erro interno"
    return reply.code(statusCode).send({ error: message || "Erro interno" })
  })

  // Rotas
  app.register(healthRoutes)
  app.register(profileRoutes)
  app.register(experienceRoutes)
  app.register(educationRoutes)
  app.register(skillRoutes)
  app.register(resumeRoutes)
  app.register(paymentRoutes, { prefix: "/payments" })

  return app
}

async function start() {
  const app = buildServer()
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
