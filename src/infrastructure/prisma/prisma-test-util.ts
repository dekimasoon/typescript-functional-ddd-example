import { it } from "vitest"
import {
  type PrismaTransaction,
  prisma,
} from "@/infrastructure/prisma/prisma-util"

export const itx = it.extend<{ tx: PrismaTransaction }>({
  // biome-ignore lint/correctness/noEmptyPattern: The first argument inside a fixture must use object destructuring pattern
  tx: async ({}, use) => {
    try {
      await prisma.$transaction(async (tx) => {
        await use(tx)
        throw new Error("rollback")
      })
    } catch {}
  },
})
