import dayjs from "dayjs"
import type { Transition } from "@/domain/domain-util"
import type { DraftPeriod } from "@/domain/object/common/element/draft-period"
import type { Period } from "@/domain/object/common/element/period"

export const transitionDraftPeriodToPeriod: Transition<
  {
    draftPeriod: DraftPeriod
    config: {
      normalDays: number
      minDays: number
      maxDays: number
    }
  },
  Period
> = (_input) => {
  // TODO: impl
  const today = dayjs().startOf("day")
  return {
    startDate: today.toDate(),
    endDate: today.add(7, "day").toDate(),
  }
}
