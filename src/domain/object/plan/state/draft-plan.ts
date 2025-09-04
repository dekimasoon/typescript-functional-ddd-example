import z from "zod"
import { draftActionPlan } from "@/domain/object/plan/element/draft-action-plan"
import { planDraftReminder } from "@/domain/object/plan/element/plan-draft-reminder"
import { planProps } from "@/domain/object/plan/plan-schema"

export const draftPlanSchema = z.object({
  goal: planProps.goal,
  draftPeriod: planProps.draftPeriod,
  draftActionPlans: z.array(draftActionPlan),
  draftReminders: z.array(planDraftReminder),
})

export type DraftPlan = z.infer<typeof draftPlanSchema>
