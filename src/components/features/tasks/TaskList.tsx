'use client'

import { motion } from 'framer-motion'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Task } from '@/types/Task'
import { Trash2, Pencil, Calendar, Clock } from 'lucide-react'
import { format } from 'date-fns'
import { DragDropContext, Droppable, Draggable, DropResult, DroppableProvided, DraggableProvided } from 'react-beautiful-dnd'
import { EditTaskDialog } from './EditTaskDialog'

interface TaskListProps {
  tasks: Task[]
  onDeleteTask: (id: string) => void
  onToggleTask: (id: string) => void
  onEditTask: (id: string, title: string, priority: Task['priority']) => void
  onUpdatePriority: (id: string, newPriority: Task['priority']) => void
}

export function TaskList({ tasks, onDeleteTask, onToggleTask, onEditTask, onUpdatePriority }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    }
    return colors[priority]
  }

    const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index
    const sourceTask = tasks[sourceIndex]
    const destinationTask = tasks[destinationIndex]

    if (sourceTask && destinationTask) {
      onUpdatePriority (sourceTask.id, destinationTask.priority)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div 
            {...provided.droppableProps} 
            ref={provided.innerRef}
            className="space-y-4"
          >
            {tasks.map((task, index) => (
              <Draggable 
                key={task.id} 
                draggableId={task.id} 
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <Card className="p-4 cursor-move hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={task.completed}
                                onCheckedChange={() => onToggleTask(task.id)}
                              />
                              <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                                {task.title}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-sm
                                ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'}`}>
                                {task.priority}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground flex items-center gap-4">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {format(new Date(task.dueDate), "PPP")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {task.dueTime}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
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
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
