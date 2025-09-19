import dayjs from "dayjs"
import type { Transition } from "@/domain/domain-util"
import type { Period } from "@/domain/object/common/element/period"
import type { PeriodSetting } from "@/domain/object/common/element/period-setting"

export const transitionPeriodSettingToPeriod: Transition<
  {
    periodSetting: PeriodSetting
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
