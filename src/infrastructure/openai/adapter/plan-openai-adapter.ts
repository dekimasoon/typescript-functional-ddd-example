import { type DraftMetric, getMetricId } from "@/domain/object/metric"
import type { DraftPlan } from "@/domain/object/plan"
import type { OpenAIPortImpl } from "@/infrastructure/openai/openai-util"
import type { PlanImplPort } from "@/usecase/port/plan-impl-port"

export const generateRawDraftPlanAndMetrics: OpenAIPortImpl<
  PlanImplPort["generateRawDraftPlanAndMetrics"]
> = () => async () => {
  // TODO: impl
  const rawDraftMetric: DraftMetric = {
    id: getMetricId(),
    name: "isTaskDone",
    type: "BOOLEAN",
  }
  const rawDraftPlan: DraftPlan = {
    goal: "Create sample code to help the team understand DDD and share it with them.",
    periodSetting: {
      type: "AUTO",
    },
    draftActionPlans: [
      {
        dateSetting: {
          type: "EVERY_DAY",
        },
        metricId: rawDraftMetric.id,
        when: "After the child fell asleep",
        what: "Do the task for 30 minutes",
        level: "BASELINE",
        remindTime: {
          hour: 22,
          minute: 0,
        },
      },
    ],
    draftReminders: [],
  }
  return {
    rawDraftPlan,
    rawDraftMetrics: [rawDraftMetric],
  }
}
