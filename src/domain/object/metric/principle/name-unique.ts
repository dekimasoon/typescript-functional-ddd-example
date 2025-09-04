import type { AsyncGuard, PortInput } from "@/domain/domain-util"
import type { MetricDomainPort } from "@/domain/object/metric/metric-domain-port"

export const nameUniqueGuard: AsyncGuard<
  PortInput<UniqueNameGuardPort["hasSameNameMetric"]>,
  UniqueNameGuardPort
> = (port) => async (input) => {
  return !(await port.hasSameNameMetric(input))
}

export type UniqueNameGuardPort = Pick<MetricDomainPort, "hasSameNameMetric">
