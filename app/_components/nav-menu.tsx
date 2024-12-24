'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from "next/link"

export function NavMenu() {
  const menuItems = [
    { name: 'Fortune Cookie', href: 'https://randomwalk.ai/fortunecookie/' },
    { name: 'Chateleon', href: 'https://chateleon.com/' },
    { name: 'Brandcut', href: 'https://randomwalk.ai/brandcut/' },
    { name: 'AI Readiness Index', href: 'https://randomwalk.ai/ai-readiness-index/' },
  ]

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Our Products</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.name}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

