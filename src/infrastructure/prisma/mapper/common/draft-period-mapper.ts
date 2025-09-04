import * as R from "remeda"
import type { DraftPeriod } from "@/domain/object/common/element/draft-period"
import type { DraftPeriodType } from "@/infrastructure/prisma/generated/client"
import type { PrismaMapper } from "@/infrastructure/prisma/prisma-util"

export const draftPeriodMapper: PrismaMapper<
  DraftPeriod,
  {
    draftPeriodType: DraftPeriodType
    draftPeriodDayOfWeek: number | null
  }
> = {
  toDomain: (x) => {
    if (x.draftPeriodType === "SELECTED_END_DAY_OF_WEEK") {
      if (!R.isNumber(x.draftPeriodDayOfWeek)) {
        throw new Error("unxpected draftPeriodDayOfWeek")
      }
      return { type: x.draftPeriodType, dayOfWeek: x.draftPeriodDayOfWeek }
    }
    return { type: x.draftPeriodType }
  },
  toPersistence: (x) => {
    const draftPeriodDayOfWeek =
      x.type === "SELECTED_END_DAY_OF_WEEK" ? x.dayOfWeek : null
    return {
      draftPeriodType: x.type,
      draftPeriodDayOfWeek: draftPeriodDayOfWeek,
    }
  },
}
