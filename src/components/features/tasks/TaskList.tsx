'use client'

import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Task } from '@/types/Task'
import { Trash2 } from 'lucide-react'

import { EditTaskDialog } from './EditTaskDialog'

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (id: string) => void
  onToggleTask: (id: string) => void
  onEditTask: (id: string, title: string, priority: Task['priority']) => void
}

export function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask }: TaskListProps) {
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
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => onToggleTask(task.id)}
                />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>
                  {task.title}
                </span>
                <span className={`px-2 py-1 rounded-full text-sm ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            <div className="flex space-x-2">
              <EditTaskDialog task={task} onEditTask={onEditTask} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteTask(task.id)}
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
