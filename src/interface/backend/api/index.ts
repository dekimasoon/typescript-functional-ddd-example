import { randomUUID } from "node:crypto"
import { createServer } from "node:http"
import { OpenAPIHandler } from "@orpc/openapi/node"
import { CORSPlugin } from "@orpc/server/plugins"
import pino from "pino"
import { prisma } from "@/infrastructure/prisma/prisma-util"
import type { ORPCInitialContext } from "@/interface/backend/api/orpc"
import { router } from "@/interface/backend/api/router"

const handler = new OpenAPIHandler(router, {
  plugins: [new CORSPlugin()],
})

const server = createServer(async (req, res) => {
  const result = await prisma.$transaction((tx) => {
    const context: ORPCInitialContext = {
      // TODO: impl
      session: {
        userId: "userId",
      },
      logger: pino({
        mixin: () => ({ rid: randomUUID() }),
      }),
      tx,
    }
    return handler.handle(req, res, {
      context,
    })
  })

  if (!result.matched) {
    res.statusCode = 404
    res.end("No procedure matched")
  }
})

server.listen(3000, "127.0.0.1", () =>
  console.log("Listening on 127.0.0.1:3000"),
)
