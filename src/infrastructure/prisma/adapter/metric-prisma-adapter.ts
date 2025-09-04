import type { PrismaPortImpl } from "@/infrastructure/prisma/prisma-util"
import type { MetricImplPort } from "@/usecase/port/metric-impl-port"

export const hasSameNameMetric: PrismaPortImpl<
  MetricImplPort["hasSameNameMetric"]
> =
  ({ tx }) =>
  async ({ userId, name }) => {
    const count = await tx.metric.count({
      where: {
        userId,
        name,
      },
    })
    return count > 0
  }

export const queryMetrics: PrismaPortImpl<MetricImplPort["queryMetrics"]> =
  ({ tx }) =>
  async ({ userId }) => {
    return tx.metric.findMany({
      where: {
        userId,
        isDraft: false,
      },
      orderBy: [
        {
          updatedAt: "asc",
        },
      ],
    })
  }

export const persisteDraftMetrics: PrismaPortImpl<
  MetricImplPort["persisteDraftMetrics"]
> =
  ({ tx }) =>
  async ({ userId, draftMetrics }) => {
    await tx.metric.createMany({
      data: draftMetrics.map((x) => ({
        ...x,
        userId,
        isDraft: false,
      })),
    })
  }
