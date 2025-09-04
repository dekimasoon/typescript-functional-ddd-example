import type pino from "pino"
import type { PortImpl } from "@/infrastructure/infrastructure-util"

export type Context = {
  logger: pino.Logger
}

export type OpenAIPortImpl<TPort> = PortImpl<Context, TPort>
