import * as R from "remeda"
import type { DateSetting } from "@/domain/object/common/element/date-setting"
import type { DateSettingType } from "@/infrastructure/prisma/generated/enums"
import type { PrismaMapper } from "@/infrastructure/prisma/prisma-util"

export const dateSettingMapper: PrismaMapper<
  DateSetting,
  {
    dateSettingType: DateSettingType
    dateSettingDayOfWeek: number | null
  }
> = {
  toDomain: (x) => {
    if (x.dateSettingType === "SELECTED_DAY_OF_WEEK") {
      if (!R.isNumber(x.dateSettingDayOfWeek)) {
        throw new Error("unxpected dateSettingDayOfWeek")
      }
      return { type: x.dateSettingType, dayOfWeek: x.dateSettingDayOfWeek }
    }
    return { type: x.dateSettingType }
  },
  toPersistence: (x) => {
    const periodSettingDayOfWeek =
      x.type === "SELECTED_DAY_OF_WEEK" ? x.dayOfWeek : null
    return {
      dateSettingType: x.type,
      dateSettingDayOfWeek: periodSettingDayOfWeek,
    }
  },
}
