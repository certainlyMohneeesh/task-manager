'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Task } from '@/types/Task'

interface TaskFormProps {
  onAddTask: (title: string, priority: Task['priority']) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask(title.trim(), priority)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="flex-1"
      />
      <Select value={priority} onValueChange={(value: Task['priority']) => setPriority(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="low">Low Priority</SelectItem>
          <SelectItem value="medium">Medium Priority</SelectItem>
          <SelectItem value="high">High Priority</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">Add Task</Button>
    </form>
  )
}
