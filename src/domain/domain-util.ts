import type z from "zod"

export type GetType<T extends Record<string, z.ZodTypeAny>> = {
  [K in keyof T]: z.infer<T[K]>
}

export type Guard<TInput> = (input: TInput) => boolean

export type AsyncGuard<TInput, TPort = unknown> = (
  port: TPort,
) => (input: TInput) => Promise<boolean>

export type Transition<
  TInput,
  TOutput,
  TPort = undefined,
> = TPort extends undefined
  ? (input: TInput) => TOutput
  : (port: TPort) => (input: TInput) => Promise<TOutput>

export type PortInput<T extends (input: never) => unknown> = Parameters<T>[0]
