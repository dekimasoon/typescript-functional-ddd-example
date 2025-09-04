import dayjs from "dayjs"
import type z from "zod"
import type { Guard } from "@/domain/domain-util"
import type { period } from "@/domain/object/common/element/period"

export const period3To10Days: Guard<z.infer<typeof period>> = (period) => {
  const start = dayjs(period.startDate)
  const end = dayjs(period.endDate)
  const diff = start.diff(end, "day")
  return 3 <= diff && diff <= 10
}
