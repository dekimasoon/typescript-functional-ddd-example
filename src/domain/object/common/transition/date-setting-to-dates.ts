import dayjs from "dayjs"
import type { Transition } from "@/domain/domain-util"
import type { DateSetting } from "@/domain/object/common/element/date-setting"

export const transitionDateSettingToDates: Transition<DateSetting, Date[]> = (
  _input,
) => {
  // TODO: impl
  const today = dayjs().startOf("day")
  return [...Array(7).keys()].map((index) => today.add(index, "day").toDate())
}
