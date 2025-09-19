import pino from "pino"
import { itx } from "@/infrastructure/prisma/prisma-test-util"
import type { ORPCInitialContext } from "@/interface/backend/api/orpc"

export const itc = itx.extend<{ context: ORPCInitialContext }>({
  context: async ({ tx }, use) => {
    const user = await tx.user.create({
      data: {},
    })
    const context = {
      tx,
      session: {
        userId: user.id,
      },
      logger: pino(),
    }
    await use(context)
  },
})
