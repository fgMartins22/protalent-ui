import type { FastifyInstance } from "fastify"

/**
 * Rotas de pagamento (STUBS).
 *
 * Fluxo futuro:
 *   Frontend -> POST /payments/checkout -> Vindi API
 *   Vindi -> POST /payments/webhook/vindi -> backend atualiza Supabase
 *   Frontend consulta status no backend.
 *
 * A chave da Vindi fica SOMENTE no backend. O webhook validará a
 * assinatura/segredo futuramente. O frontend nunca confirma pagamento.
 */
export async function paymentRoutes(app: FastifyInstance) {
  // Inicia um checkout (criará cobrança/assinatura na Vindi futuramente)
  app.post("/checkout", async (request) => ({
    stub: true,
    route: "POST /payments/checkout",
    received: request.body ?? null,
  }))

  // Recebe eventos da Vindi (validação de assinatura virá depois)
  app.post("/webhook/vindi", async (request, reply) => {
    request.log.info("Webhook Vindi recebido (stub) — sem validação ainda")
    // Responder 200 rápido é o padrão esperado por provedores de webhook.
    return reply.code(200).send({ received: true, stub: true })
  })
}
