import dayjs from "dayjs"
import type { Transition } from "@/domain/domain-util"
import type { DraftDate } from "@/domain/object/common/element/draft-date"

export const transitionDraftDateToDates: Transition<DraftDate, Date[]> = (
  _input,
) => {
  // TODO: impl
  const today = dayjs().startOf("day")
  return [...Array(7).keys()].map((index) => today.add(index, "day").toDate())
}
