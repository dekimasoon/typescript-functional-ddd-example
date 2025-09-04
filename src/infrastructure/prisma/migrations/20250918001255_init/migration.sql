-- CreateEnum
CREATE TYPE "public"."MetricType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN');

-- CreateEnum
CREATE TYPE "public"."ActionPlanLevel" AS ENUM ('BASELINE', 'STRETCH');

-- CreateEnum
CREATE TYPE "public"."DraftPeriodType" AS ENUM ('AUTO', 'SELECTED_END_DAY_OF_WEEK');

-- CreateEnum
CREATE TYPE "public"."DraftDateType" AS ENUM ('EVERY_DAY', 'WEEKDAYS', 'WEEKENDS_AND_HOLIDAYS', 'SELECTED_DAY_OF_WEEK');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Metric" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."MetricType" NOT NULL,
    "isDraft" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Plan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "periodStartDate" TIMESTAMP(3) NOT NULL,
    "periodEndDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ActionPlan" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "metricId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "when" TEXT NOT NULL,
    "what" TEXT NOT NULL,
    "level" "public"."ActionPlanLevel" NOT NULL,
    "remindTimeHour" INTEGER,
    "remindTimeMinute" INTEGER,

    CONSTRAINT "ActionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PlanReminder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "planId" TEXT NOT NULL,

    CONSTRAINT "PlanReminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DraftPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "draftPeriodType" "public"."DraftPeriodType" NOT NULL,
    "draftPeriodDayOfWeek" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DraftPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DraftActionPlan" (
    "id" TEXT NOT NULL,
    "draftPlanId" TEXT NOT NULL,
    "metricId" TEXT NOT NULL,
    "draftDateType" "public"."DraftDateType" NOT NULL,
    "draftDateDayOfWeek" INTEGER,
    "when" TEXT NOT NULL,
    "what" TEXT NOT NULL,
    "level" "public"."ActionPlanLevel" NOT NULL,
    "remindTimeHour" INTEGER,
    "remindTimeMinute" INTEGER,

    CONSTRAINT "DraftActionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DraftPlanReminder" (
    "id" TEXT NOT NULL,
    "draftPlanId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "draftDateType" "public"."DraftDateType" NOT NULL,
    "draftDateDayOfWeek" INTEGER,
    "hour" INTEGER NOT NULL,
    "minute" INTEGER NOT NULL,

    CONSTRAINT "DraftPlanReminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DraftPlan_userId_key" ON "public"."DraftPlan"("userId");

-- AddForeignKey
ALTER TABLE "public"."Metric" ADD CONSTRAINT "Metric_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Plan" ADD CONSTRAINT "Plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActionPlan" ADD CONSTRAINT "ActionPlan_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ActionPlan" ADD CONSTRAINT "ActionPlan_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "public"."Metric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlanReminder" ADD CONSTRAINT "PlanReminder_planId_fkey" FOREIGN KEY ("planId") REFERENCES "public"."Plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DraftPlan" ADD CONSTRAINT "DraftPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DraftActionPlan" ADD CONSTRAINT "DraftActionPlan_draftPlanId_fkey" FOREIGN KEY ("draftPlanId") REFERENCES "public"."DraftPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DraftActionPlan" ADD CONSTRAINT "DraftActionPlan_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "public"."Metric"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DraftPlanReminder" ADD CONSTRAINT "DraftPlanReminder_draftPlanId_fkey" FOREIGN KEY ("draftPlanId") REFERENCES "public"."DraftPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
