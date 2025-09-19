/*
  Warnings:

  - You are about to drop the column `draftDateDayOfWeek` on the `DraftActionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `draftDateType` on the `DraftActionPlan` table. All the data in the column will be lost.
  - You are about to drop the column `draftPeriodDayOfWeek` on the `DraftPlan` table. All the data in the column will be lost.
  - You are about to drop the column `draftPeriodType` on the `DraftPlan` table. All the data in the column will be lost.
  - You are about to drop the column `draftDateDayOfWeek` on the `DraftPlanReminder` table. All the data in the column will be lost.
  - You are about to drop the column `draftDateType` on the `DraftPlanReminder` table. All the data in the column will be lost.
  - Added the required column `dateSettingType` to the `DraftActionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `periodSettingType` to the `DraftPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateSettingType` to the `DraftPlanReminder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."PeriodSettingType" AS ENUM ('AUTO', 'SELECTED_END_DAY_OF_WEEK');

-- CreateEnum
CREATE TYPE "public"."DateSettingType" AS ENUM ('EVERY_DAY', 'WEEKDAYS', 'WEEKENDS_AND_HOLIDAYS', 'SELECTED_DAY_OF_WEEK');

-- AlterTable
ALTER TABLE "public"."DraftActionPlan" DROP COLUMN "draftDateDayOfWeek",
DROP COLUMN "draftDateType",
ADD COLUMN     "dateSettingDayOfWeek" INTEGER,
ADD COLUMN     "dateSettingType" "public"."DateSettingType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."DraftPlan" DROP COLUMN "draftPeriodDayOfWeek",
DROP COLUMN "draftPeriodType",
ADD COLUMN     "periodSettingDayOfWeek" INTEGER,
ADD COLUMN     "periodSettingType" "public"."PeriodSettingType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."DraftPlanReminder" DROP COLUMN "draftDateDayOfWeek",
DROP COLUMN "draftDateType",
ADD COLUMN     "dateSettingDayOfWeek" INTEGER,
ADD COLUMN     "dateSettingType" "public"."DateSettingType" NOT NULL;

-- DropEnum
DROP TYPE "public"."DraftDateType";

-- DropEnum
DROP TYPE "public"."DraftPeriodType";
