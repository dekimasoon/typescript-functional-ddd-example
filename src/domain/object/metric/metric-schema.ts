import { typeid } from "typeid-js"
import z from "zod"
import type { GetType } from "@/domain/domain-util"
import { metricRecord } from "@/domain/object/metric/element/metric-record"

export const getMetricId = () => typeid("metric").toString()

export const metricProps = {
  id: z.string(),
  name: z.string().max(64),
  type: z.enum(["STRING", "NUMBER", "BOOLEAN"]),
  isDraft: z.boolean(),
}

export const metricRelations = {
  record: z.object(metricRecord),
}

export type MetricProps = GetType<typeof metricProps>
export type MetricRelations = GetType<typeof metricRelations>
