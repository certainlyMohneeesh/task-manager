'use client'

import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Task } from '@/types/Task'
import { Trash2, Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'

import { EditTaskDialog } from './EditTaskDialog'

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (id: string) => void
  onToggleTask: (id: string) => void
  onEditTask: (id: string, title: string, priority: Task['priority'], dueDate: Date, dueTime: string) => void
}

export function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }: TaskListProps) {
  const handleEditSubmit = (task: Task, title: string, priority: Task['priority'], dueDate: Date, dueTime: string) => {
    const formattedTime = dueTime.length === 5 ? dueTime : `${dueTime}:00`
    onEditTask(task.id, title, priority, dueDate, formattedTime)
    // Dispatch task update event
    window.dispatchEvent(new Event('taskUpdate'))
  }

  const handleToggleTask = (id: string) => {
    onToggleTask(id)
    window.dispatchEvent(new Event('taskUpdate'))
  }

  const handleDeleteTask = (id: string) => {
    onDeleteTask(id)
    window.dispatchEvent(new Event('taskUpdate'))
  }

  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    }
    return colors[priority]
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card key={task.id} className="p-3 lg:p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center gap-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleToggleTask(task.id)}
                  />
                  <span className={task.completed ? 'flex-1 min-w-0 break-words' : ''}>
                    {task.title}
                  </span>
                  <span className={`text-xs whitespace-nowrap px-2 py-1 rounded-full mt-2 inline-block
                    ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'}`}>
                    {task.priority}
                  </span>
                </div>
                <div className="mt-2 text-sm flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {format(task.dueDate, "PPP")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {task.dueTime}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <EditTaskDialog
                  task={task}
                  onEditTask={(id, title, priority, dueDate, dueTime) => {
                    handleEditSubmit(task, title, priority, dueDate, dueTime)
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
