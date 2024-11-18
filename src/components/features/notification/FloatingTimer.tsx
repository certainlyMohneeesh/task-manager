'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Task } from "@/types/Task"
import { differenceInSeconds, differenceInHours, differenceInMinutes } from 'date-fns'
import Draggable from 'react-draggable'
import { useTaskSync } from '@/hooks/useTaskSync'

interface FloatingTimerProps {
  tasks: Task[]
}

export function FloatingTimer({ tasks }: FloatingTimerProps) {
  const nodeRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState('--:--:--')
  const [nextTaskTitle, setNextTaskTitle] = useState('')

  const getActiveTasks = useCallback(() => {
    return tasks.filter(task => !task.completed)
  }, [tasks])

  const getCompletedTasks = useCallback(() => {
    return tasks.filter(task => task.completed)
  }, [tasks])

  const updateTimer = useCallback(() => {
    const activeTasks = getActiveTasks()
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
     
      setProgress(Math.min(100, Math.max(0, progressValue)))
      setTimeLeft(formattedTime)
      setNextTaskTitle(nextTask.title)
    } else {
      setTimeLeft('--:--:--')
      setNextTaskTitle('No upcoming tasks')
      setProgress(0)
    }
  }, [getActiveTasks])

  // Regular timer update
  useEffect(() => {
    const handleTaskEdit = () => {
      updateTimer()
    }
  
    window.addEventListener('TASK_EDITED', handleTaskEdit)
    return () => window.removeEventListener('TASK_EDITED', handleTaskEdit)
  }, [updateTimer])
  
  

  // Task sync using custom hook
  useTaskSync(updateTimer)

  const handleClose = () => {
    setIsVisible(false)
  }

  const activeTasks = getActiveTasks()
  const completedTasks = getCompletedTasks()

  if (!isVisible) return null

  return (
    <Draggable nodeRef={nodeRef}>
      <Card ref={nodeRef} className="fixed bottom-4 right-4 p-4 w-80 cursor-move shadow-lg z-50">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-sm font-medium">Task Timer</h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Next Task: </span>
            <span className="text-primary truncate ml-2">{nextTaskTitle}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Time Remaining:</span>
            <span className="font-mono">{timeLeft}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="text-xs text-center text-muted-foreground">
            {completedTasks.length} of {activeTasks.length + completedTasks.length} tasks completed
          </div>
        </div>
      </Card>
    </Draggable>
  )
}

