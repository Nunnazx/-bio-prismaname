"use client"

import { useState } from "react"
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function RichTextEditor({ initialValue = "", onChange }) {
  const [content, setContent] = useState(initialValue)
  const [view, setView] = useState("write")

  const handleChange = (e) => {
    setContent(e.target.value)
    onChange(e.target.value)
  }

  const insertMarkdown = (markdownSyntax, placeholder = "") => {
    const textarea = document.getElementById("editor-textarea")
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end) || placeholder

    const beforeText = content.substring(0, start)
    const afterText = content.substring(end)

    let newText
    if (markdownSyntax === "heading") {
      newText = `${beforeText}## ${selectedText}${afterText}`
    } else if (markdownSyntax === "heading1") {
      newText = `${beforeText}# ${selectedText}${afterText}`
    } else if (markdownSyntax === "heading2") {
      newText = `${beforeText}## ${selectedText}${afterText}`
    } else if (markdownSyntax === "heading3") {
      newText = `${beforeText}### ${selectedText}${afterText}`
    } else if (markdownSyntax === "bold") {
      newText = `${beforeText}**${selectedText}**${afterText}`
    } else if (markdownSyntax === "italic") {
      newText = `${beforeText}_${selectedText}_${afterText}`
    } else if (markdownSyntax === "link") {
      newText = `${beforeText}[${selectedText}](url)${afterText}`
    } else if (markdownSyntax === "image") {
      newText = `${beforeText}![${selectedText}](image-url)${afterText}`
    } else if (markdownSyntax === "list") {
      newText = `${beforeText}\n- ${selectedText}\n- Item 2\n- Item 3${afterText}`
    } else if (markdownSyntax === "ordered-list") {
      newText = `${beforeText}\n1. ${selectedText}\n2. Item 2\n3. Item 3${afterText}`
    } else if (markdownSyntax === "quote") {
      newText = `${beforeText}\n> ${selectedText}\n${afterText}`
    } else if (markdownSyntax === "code") {
      newText = `${beforeText}\`\`\`\n${selectedText}\n\`\`\`${afterText}`
    }

    setContent(newText)
    onChange(newText)

    // Reset focus to the textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(
        start + markdownSyntax.length + 2,
        start + markdownSyntax.length + 2 + selectedText.length,
      )
    }, 0)
  }

  return (
    <div className="border rounded-md">
      <div className="border-b p-2">
        <ToggleGroup type="multiple" className="flex flex-wrap gap-1">
          <ToggleGroupItem
            value="heading1"
            aria-label="Heading 1"
            onClick={() => insertMarkdown("heading1", "Heading")}
          >
            <Heading1 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading2"
            aria-label="Heading 2"
            onClick={() => insertMarkdown("heading2", "Heading")}
          >
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heading3"
            aria-label="Heading 3"
            onClick={() => insertMarkdown("heading3", "Heading")}
          >
            <Heading3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="bold" aria-label="Bold" onClick={() => insertMarkdown("bold", "Bold text")}>
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic" onClick={() => insertMarkdown("italic", "Italic text")}>
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="link" aria-label="Link" onClick={() => insertMarkdown("link", "Link text")}>
            <Link className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="image" aria-label="Image" onClick={() => insertMarkdown("image", "Image alt text")}>
            <ImageIcon className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="Bullet List" onClick={() => insertMarkdown("list", "List item")}>
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="ordered-list"
            aria-label="Numbered List"
            onClick={() => insertMarkdown("ordered-list", "List item")}
          >
            <ListOrdered className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="quote" aria-label="Quote" onClick={() => insertMarkdown("quote", "Quoted text")}>
            <Quote className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="code" aria-label="Code Block" onClick={() => insertMarkdown("code", "Code snippet")}>
            <Code className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <Tabs value={view} onValueChange={setView} className="w-full">
        <div className="border-b px-3">
          <TabsList className="h-9 bg-transparent">
            <TabsTrigger
              value="write"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Write
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="p-0 border-0 mt-0">
          <Textarea
            id="editor-textarea"
            value={content}
            onChange={handleChange}
            placeholder="Write your content here..."
            className="min-h-[300px] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </TabsContent>

        <TabsContent value="preview" className="p-4 border-0 mt-0">
          {content ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {/* In a real implementation, you would render Markdown here */}
              <div className="whitespace-pre-wrap">{content}</div>
            </div>
          ) : (
            <div className="text-muted-foreground text-center py-12">Nothing to preview</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
