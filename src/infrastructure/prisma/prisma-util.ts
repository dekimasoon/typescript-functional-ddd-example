import type pino from "pino"
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
