"use client"

import { Task } from "@/types/Task"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle, RotateCcw, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from 'date-fns'

interface SidebarProps {
  completedTasks: Task[]
  onRedoTask: (id: string) => void
}

export function Sidebar({ completedTasks, onRedoTask }: SidebarProps) {
  return (
<div className="w-full lg:w-64 h-auto lg:h-screen bg-muted/30 p-4 lg:fixed lg:left-0 lg:top-0 overflow-y-auto">
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <CheckCircle className="h-5 w-5 text-green-500" />
      Completed Tasks
    </h2>
    <div className="space-y-3">
      {completedTasks.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
        >
          <Card className="p-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm line-through text-muted-foreground">{task.title}</p>
                <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block
                  ${task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}`}>
                  {task.priority}
                </span>
                <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(task.dueDate), "PPP")}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {task.dueTime}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onRedoTask(task.id)}
                className="hover:text-primary"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
  )
}
