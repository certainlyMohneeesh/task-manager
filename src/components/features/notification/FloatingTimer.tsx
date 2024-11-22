'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Task } from "@/types/Task"
import { differenceInSeconds, differenceInHours, differenceInMinutes } from 'date-fns'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

interface FloatingTimerProps {
  tasks: Task[]
}

export function FloatingTimer({ tasks }: FloatingTimerProps) {
  const [timerWindow, setTimerWindow] = useState<Window | null>(null)

  //standalone window using window api 
  const openTimerWindow = () => {
    const width = 320
    const height = 200
    const left = window.screen.width - width
    const top = window.screen.height - height - 100

    const newWindow = window.open(
      '',
      'TaskTimer',
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,location=no,status=no`
    )

    if (newWindow) {
      setTimerWindow(newWindow)
      setupTimerWindow(newWindow)
    }
  }

  const setupTimerWindow = (win: Window) => {
    win.document.head.innerHTML = `
    <style>
      /* Tailwind base styles */
      @tailwind base;
      @tailwind components;
      @tailwind utilities;

      /* Root variables */
      :root {
        --background: 0 0% 100%;
        --foreground: 240 10% 3.9%;
        --card: 0 0% 100%;
        --card-foreground: 240 10% 3.9%;
        --popover: 0 0% 100%;
        --popover-foreground: 240 10% 3.9%;
        --primary: 240 5.9% 10%;
        --primary-foreground: 0 0% 98%;
        --secondary: 240 4.8% 95.9%;
        --secondary-foreground: 240 5.9% 10%;
        --muted: 240 4.8% 95.9%;
        --muted-foreground: 240 3.8% 46.1%;
        --accent: 240 4.8% 95.9%;
        --accent-foreground: 240 5.9% 10%;
        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 0 0% 98%;
        --border: 240 5.9% 90%;
        --input: 240 5.9% 90%;
        --ring: 240 10% 3.9%;
        --radius: 0.5rem;
      }

      /* Dark mode variables */
      @media (prefers-color-scheme: dark) {
        :root {
          --background: 240 10% 3.9%;
          --foreground: 0 0% 98%;
          --card: 240 10% 3.9%;
          --card-foreground: 0 0% 98%;
          --popover: 240 10% 3.9%;
          --popover-foreground: 0 0% 98%;
          --primary: 0 0% 98%;
          --primary-foreground: 240 5.9% 10%;
          --secondary: 240 3.7% 15.9%;
          --secondary-foreground: 0 0% 98%;
          --muted: 240 3.7% 15.9%;
          --muted-foreground: 240 5% 64.9%;
          --accent: 240 3.7% 15.9%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 3.7% 15.9%;
          --input: 240 3.7% 15.9%;
          --ring: 240 4.9% 83.9%;
        }
      }

      /* Base styles */
      * {
        border-color: hsl(var(--border));
      }
      
      body {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        margin: 0;
        font-family: system-ui, -apple-system, sans-serif;
      }

      /* Animation */
      .slide-in {
        animation: slideIn 0.3s ease-out forwards;
      }

      @keyframes slideIn {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    </style>
  `
    const styles = Array.from(document.styleSheets)
      .map(sheet => {
        try {
          return Array.from(sheet.cssRules)
            .map(rule => rule.cssText)
            .join('\n')
        } catch {
          return ''
        }
      })
      .join('\n')

    win.document.head.innerHTML = `
      <style>${styles}</style>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    `

    win.document.body.innerHTML = `
      <div id="timer-root" class="p-4 bg-background min-h-screen">
        <div class="space-y-3">
          <div class="flex justify-between text-sm">
            <span class="font-medium">Next Task: </span>
            <span class="text-primary truncate ml-2" id="task-title"></span>
          </div>
          <div class="flex justify-between text-sm">
            <span>Time Remaining:</span>
            <span class="font-mono" id="time-left"></span>
          </div>
          <div class="h-2 relative w-full overflow-hidden rounded-full bg-secondary">
            <div id="progress-bar" class="h-full w-0 flex-1 bg-primary transition-all"></div>
          </div>
          <div class="text-xs text-center text-muted-foreground" id="task-count"></div>
        </div>
      </div>
    `
  }

  const updateTimerDisplay = useCallback(() => {
    if (!timerWindow || timerWindow.closed) return

    const activeTasks = tasks.filter(task => !task.completed)
    const completedTasks = tasks.filter(task => task.completed)
    const now = new Date()
    
    const upcomingTasks = activeTasks
      .map(task => {
        const [hours, minutes] = task.dueTime.split(':')
        const taskDate = new Date(task.dueDate)
        taskDate.setHours(parseInt(hours), parseInt(minutes), 0)
        return { ...task, dateTime: taskDate }
      })
      .filter(task => task.dateTime > now)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

    const nextTask = upcomingTasks[0]
    
    if (nextTask) {
      const seconds = differenceInSeconds(nextTask.dateTime, now) % 60
      const minutes = differenceInMinutes(nextTask.dateTime, now) % 60
      const hours = differenceInHours(nextTask.dateTime, now)

      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      const totalSeconds = differenceInSeconds(nextTask.dateTime, now)
      const progressValue = 100 - ((totalSeconds / (24 * 60 * 60)) * 100)
      
      const taskTitle = timerWindow.document.getElementById('task-title')
      const timeLeft = timerWindow.document.getElementById('time-left')
      const progressBar = timerWindow.document.getElementById('progress-bar')
      const taskCount = timerWindow.document.getElementById('task-count')
      
      if (taskTitle) taskTitle.textContent = nextTask.title
      if (timeLeft) timeLeft.textContent = formattedTime
      if (progressBar) progressBar.style.width = `${Math.min(100, Math.max(0, progressValue))}%`
      if (taskCount) taskCount.textContent = `${completedTasks.length} of ${activeTasks.length + completedTasks.length} tasks completed`
    }
  }, [timerWindow, tasks])

  useEffect(() => {
    if (timerWindow) {
      const timer = setInterval(updateTimerDisplay, 1000)
      return () => clearInterval(timer)
    }
  }, [timerWindow, updateTimerDisplay])

  return (
    <Button 
      onClick={openTimerWindow}
      className="fixed bottom-4 right-4 z-50"
      variant="outline"
    >
      <ExternalLink className="mr-2 h-4 w-4" />
      Open Timer Window
    </Button>
  )
}
