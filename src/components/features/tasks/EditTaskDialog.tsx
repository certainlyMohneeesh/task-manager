'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { Task } from '@/types/Task'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'


interface EditTaskDialogProps {
  task: Task
  onEditTask: (id: string, title: string, priority: Task['priority'], dueDate: Date, dueTime: string) => void
}

export function EditTaskDialog({ task, onEditTask }: EditTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(task.title)
  const [priority, setPriority] = useState<Task['priority']>(task.priority)

// In your EditTaskDialog.tsx where you handle the submit
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  onEditTask(task.id, title, priority, task.dueDate, task.dueTime)
  setOpen(false)
  toast({
    title: "Task updated",
    description: "Your task has been successfully updated.",
  })
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />
          <Select value={priority} onValueChange={(value: Task['priority']) => setPriority(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}