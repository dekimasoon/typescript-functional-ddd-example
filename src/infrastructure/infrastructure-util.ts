import type pino from "pino"

export type PortImpl<
  TContext extends {
    logger: pino.Logger
  },
  TPort,
> = (ctx: TContext) => TPort
