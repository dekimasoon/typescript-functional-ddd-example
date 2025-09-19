import * as R from "remeda"
import type { PeriodSetting } from "@/domain/object/common/element/period-setting"
import type { PeriodSettingType } from "@/infrastructure/prisma/generated/client"
import type { PrismaMapper } from "@/infrastructure/prisma/prisma-util"

export const periodSettingMapper: PrismaMapper<
  PeriodSetting,
  {
    periodSettingType: PeriodSettingType
    periodSettingDayOfWeek: number | null
  }
> = {
  toDomain: (x) => {
    if (x.periodSettingType === "SELECTED_END_DAY_OF_WEEK") {
      if (!R.isNumber(x.periodSettingDayOfWeek)) {
        throw new Error("unxpected periodSettingDayOfWeek")
      }
      return { type: x.periodSettingType, dayOfWeek: x.periodSettingDayOfWeek }
    }
    return { type: x.periodSettingType }
  },
  toPersistence: (x) => {
    const periodSettingDayOfWeek =
      x.type === "SELECTED_END_DAY_OF_WEEK" ? x.dayOfWeek : null
    return {
      periodSettingType: x.type,
      periodSettingDayOfWeek: periodSettingDayOfWeek,
    }
  },
}
