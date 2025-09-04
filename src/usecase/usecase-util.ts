import type pino from "pino"

export type Context = {
  logger: pino.Logger
}

export type Command<TInput = unknown, TOutput = unknown> = {
  input: TInput
  output: TOutput
}

export type Query<TInput = unknown, TOutput = unknown> = {
  input: TInput
  output: TOutput
}

export type PortInput<T extends (input: never) => unknown> = Parameters<T>[0]

export type CommandImpl<TCommand extends Command, TPort> = (
  port: TPort,
  ctx: Context,
) => (input: TCommand["input"]) => Promise<TCommand["output"]>

export type QueryImpl<TQuery extends Query, TPort> = (
  port: TPort,
  ctx: Context,
) => (input: TQuery["input"]) => Promise<TQuery["output"]>
