import z from "zod"
import { planProps, planRelations } from "@/domain/object/plan/plan-schema"

export const activePlanSchema = z.object({
  id: planProps.id,
  goal: planProps.goal,
  period: planProps.period,
  actionPlans: z.array(planRelations.actionPlan),
  reminders: z.array(planRelations.reminder),
})

export type ActivePlan = z.infer<typeof activePlanSchema>
