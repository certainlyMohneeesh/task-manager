"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    </div>
  )
}