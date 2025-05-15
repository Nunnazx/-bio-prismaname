"use client"

import { useState, useRef, type KeyboardEvent } from "react"
import { X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export function TagInput({ tags = [], onChange, placeholder = "Add tag..." }) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault()
      if (!tags.includes(inputValue.trim())) {
        const newTags = [...tags, inputValue.trim()]
        onChange(newTags)
      }
      setInputValue("")
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1)
      onChange(newTags)
    }
  }

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index)
    onChange(newTags)
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className="flex flex-wrap gap-2 p-2 border rounded-md min-h-10 focus-within:ring-1 focus-within:ring-ring"
      onClick={handleContainerClick}
    >
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="text-xs">
          {tag}
          <button
            type="button"
            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
            onClick={() => removeTag(index)}
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </Badge>
      ))}
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-7"
      />
    </div>
  )
}
