import * as R from "remeda"
import type { DraftDate } from "@/domain/object/common/element/draft-date"
import type { DraftDateType } from "@/infrastructure/prisma/generated/enums"
import type { PrismaMapper } from "@/infrastructure/prisma/prisma-util"

export const draftDateMapper: PrismaMapper<
  DraftDate,
  {
    draftDateType: DraftDateType
    draftDateDayOfWeek: number | null
  }
> = {
  toDomain: (x) => {
    if (x.draftDateType === "SELECTED_DAY_OF_WEEK") {
      if (!R.isNumber(x.draftDateDayOfWeek)) {
        throw new Error("unxpected draftDateDayOfWeek")
      }
      return { type: x.draftDateType, dayOfWeek: x.draftDateDayOfWeek }
    }
    return { type: x.draftDateType }
  },
  toPersistence: (x) => {
    const draftPeriodDayOfWeek =
      x.type === "SELECTED_DAY_OF_WEEK" ? x.dayOfWeek : null
    return {
      draftDateType: x.type,
      draftDateDayOfWeek: draftPeriodDayOfWeek,
    }
  },
}
