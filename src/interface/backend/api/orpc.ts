import { os } from "@orpc/server"
import type pino from "pino"
import type { PrismaTransaction } from "@/infrastructure/prisma/prisma-util"

export type ORPCInitialContext = {
  session: Session
  logger: pino.Logger
  tx: PrismaTransaction
}

type Session = {
  userId: string
}

export const base = os.$context<ORPCInitialContext>()
