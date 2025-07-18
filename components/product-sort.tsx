"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ProductSortProps {
  value: string
  onChange: (value: string) => void
}

export function ProductSort({ value, onChange }: ProductSortProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="name">Name (A-Z)</SelectItem>
        <SelectItem value="category">Category</SelectItem>
        <SelectItem value="newest">Newest First</SelectItem>
        <SelectItem value="featured">Featured First</SelectItem>
      </SelectContent>
    </Select>
  )
}