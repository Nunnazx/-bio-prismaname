"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data - this would come from Supabase in the real implementation
const data = [
  { month: "Jan", inquiries: 12 },
  { month: "Feb", inquiries: 15 },
  { month: "Mar", inquiries: 18 },
  { month: "Apr", inquiries: 14 },
  { month: "May", inquiries: 20 },
  { month: "Jun", inquiries: 32 },
]

export function InquiriesChart() {
  return (
    <ChartContainer
      config={{
        inquiries: {
          label: "Inquiries",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="inquiries"
            style={{
              fill: "var(--color-inquiries)",
              opacity: 0.9,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
