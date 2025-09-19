import * as R from "remeda"
import { dateSettingMapper } from "@/infrastructure/prisma/mapper/common/date-setting-mappter"
import { periodSettingMapper } from "@/infrastructure/prisma/mapper/common/period-setting-mapper"
import type { PrismaPortImpl } from "@/infrastructure/prisma/prisma-util"
import type { PlanImplPort } from "@/usecase/port/plan-impl-port"

export const hasDraftPlan: PrismaPortImpl<PlanImplPort["hasDraftPlan"]> =
  ({ tx }) =>
  async ({ userId }) => {
    const count = await tx.draftPlan.count({
      where: {
        userId,
      },
    })
    return count > 0
  }

export const hasOverlappingPlan: PrismaPortImpl<
  PlanImplPort["hasOverlappingPlan"]
> =
  ({ tx }) =>
  async ({ userId, period }) => {
    const count = await tx.plan.count({
      where: {
        userId,
        periodStartDate: {
          gte: period.startDate,
        },
        periodEndDate: {
          lte: period.endDate,
        },
      },
    })
    return count > 0
  }

export const persisteDraftPlan: PrismaPortImpl<
  PlanImplPort["persisteDraftPlan"]
> =
  ({ tx }) =>
  async ({ userId, draftPlan }) => {
    const created = await tx.draftPlan.create({
      data: {
        userId,
        goal: draftPlan.goal,
        ...periodSettingMapper.toPersistence(draftPlan.periodSetting),
        draftActionPlans: {
          create: draftPlan.draftActionPlans.map((x) => {
            return {
              ...dateSettingMapper.toPersistence(x.dateSetting),
              when: x.when,
              what: x.what,
              level: x.level,
              remindTimeHour: x.remindTime?.hour ?? null,
              remindTimeMinute: x.remindTime?.minute ?? null,
              metric: {
                connect: {
                  id: x.metricId,
                },
              },
            }
          }),
        },
        draftPlanReminders: {
          create: draftPlan.draftReminders.map((x) => {
            return {
              ...dateSettingMapper.toPersistence(x.dateSetting),
              name: x.name,
              hour: x.time.hour,
              minute: x.time.minute,
            }
          }),
        },
      },
    })
    return created.id
  }

export const getDraftPlanWithMetrics: PrismaPortImpl<
  PlanImplPort["getDraftPlanWithMetrics"]
> =
  ({ tx }) =>
  async ({ userId }) => {
    const raw = await tx.draftPlan.findFirstOrThrow({
      where: {
        userId,
      },
      include: {
        draftActionPlans: {
          include: {
            metric: true,
          },
        },
        draftPlanReminders: true,
      },
    })
    return {
      goal: raw.goal,
      periodSetting: periodSettingMapper.toDomain(raw),
      draftActionPlans: raw.draftActionPlans.map((x) => {
        const remindTime =
          R.isNumber(x.remindTimeHour) && R.isNumber(x.remindTimeMinute)
            ? {
                hour: x.remindTimeHour,
                minute: x.remindTimeMinute,
              }
            : null
        return {
          dateSetting: dateSettingMapper.toDomain(x),
          when: x.when,
          what: x.what,
          level: x.level,
          metricId: x.metricId,
          remindTime,
          metirc: x.metric,
        }
      }),
      draftReminders: raw.draftPlanReminders.map((x) => {
        return {
          name: x.name,
          time: {
            hour: x.hour,
            minute: x.minute,
          },
          dateSetting: dateSettingMapper.toDomain(x),
        }
      }),
    }
  }
