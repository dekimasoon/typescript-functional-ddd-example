import { typeid } from "typeid-js"
import z from "zod"
import type { GetType } from "@/domain/domain-util"
import { period } from "@/domain/object/common/element/period"
import { periodSetting } from "@/domain/object/common/element/period-setting"
import { actionPlan } from "@/domain/object/plan/element/action-plan"
import { draftActionPlan } from "@/domain/object/plan/element/draft-action-plan"
import { planDraftReminder } from "@/domain/object/plan/element/plan-draft-reminder"
import { planReminder } from "@/domain/object/plan/element/plan-reminder"
import { period3To10Days } from "@/domain/object/plan/principle/period-3-to-10-days"

export const getPlanId = () => typeid("plan").toString()

export const planProps = {
  id: z.string(),
  goal: z.string().max(128),
  isDraft: z.boolean(),
  period: period.refine(period3To10Days),
  periodSetting,
}

export const planRelations = {
  actionPlan,
  reminder: planReminder,
  draftActionPlan,
  draftReminder: planDraftReminder,
}

export type PlanProps = GetType<typeof planProps>
export type PlanRelations = GetType<typeof planRelations>
