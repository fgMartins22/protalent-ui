import Fastify from "fastify"
import { env } from "./config/env"
import { healthRoutes } from "./routes/health"
import { profileRoutes } from "./routes/profiles"
import { resumeRoutes } from "./routes/resumes"
import { paymentRoutes } from "./routes/payments"

export function buildServer() {
  const app = Fastify({
    logger: true,
  })

  // Health check
  app.register(healthRoutes)

  // Domínios (stubs por enquanto)
  app.register(profileRoutes, { prefix: "/profiles" })
  app.register(resumeRoutes, { prefix: "/resumes" })
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
