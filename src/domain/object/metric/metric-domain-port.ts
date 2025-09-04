import type { MetricProps } from "@/domain/object/metric"
import type { UserProps } from "@/domain/object/user"

export type MetricDomainPort = {
  hasSameNameMetric: (input: {
    userId: UserProps["id"]
    name: MetricProps["name"]
  }) => Promise<boolean>
}
