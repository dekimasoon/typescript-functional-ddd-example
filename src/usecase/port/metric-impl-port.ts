import type {
  DraftMetric,
  MetricDomainPort,
  MetricProps,
} from "@/domain/object/metric"
import type { UserProps } from "@/domain/object/user"

export type MetricImplPort = MetricDomainPort & {
  queryMetrics: QueryMetrics
  persisteDraftMetrics: PersisteDraftMetrics
}

type QueryMetrics = (input: {
  userId: UserProps["id"]
}) => Promise<MetricProps[]>

type PersisteDraftMetrics = (input: {
  userId: string
  draftMetrics: DraftMetric[]
}) => Promise<void>
