import z from "zod"

// NOTE: 0 (Sunday) to 6 (Saturday)
export const dayOfWeek = z.number().min(0).max(6)
