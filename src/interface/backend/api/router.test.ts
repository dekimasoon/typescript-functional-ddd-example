import { call } from "@orpc/server"
import { describe, expect } from "vitest"
import { itc } from "@/interface/backend/api/api-util"
import { router } from "@/interface/backend/api/router"

describe("requestDraftPlanAndMetrics", () => {
  itc("returns created planId", async ({ context }) => {
    const response = await call(
      router.command.plan.requestDraftPlanAndMetrics,
      {
        outline: "some outline",
      },
      { context },
    )
    expect(response).toEqual(expect.any(String))
  })
})
