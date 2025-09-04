import type pino from "pino"
import { it } from "vitest"
import type { PortImpl } from "@/infrastructure/infrastructure-util"
import { PrismaClient } from "@/infrastructure/prisma/generated/client"

export const prisma = new PrismaClient()

export type PrismaTransaction = Parameters<
  Parameters<(typeof prisma)["$transaction"]>[0]
>[0]

export type Context = {
  tx: PrismaTransaction
  logger: pino.Logger
}

export type PrismaPortImpl<TPort> = PortImpl<Context, TPort>

export type PrismaMapper<TDomain, TPersistence> = {
  toPersistence: (input: TDomain) => TPersistence
  toDomain: (input: TPersistence) => TDomain
}

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
