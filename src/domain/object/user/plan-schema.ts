import z from "zod"
import type { GetType } from "@/domain/domain-util"

export const userProps = {
  id: z.string(),
}

export type UserProps = GetType<typeof userProps>
