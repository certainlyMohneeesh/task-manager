'use client'

import { useState } from 'react'
import { TaskForm } from '@/components/features/tasks/TaskForm'
import { TaskList } from '@/components/features/tasks/TaskList'
import { useTasks } from '@/hooks/useTasks'
import { SearchBar } from "@/components/features/search/SearchBar"
import { ThemeSwitcher } from "@/components/features/theme/ThemeSwitcher"
import { Sidebar } from "@/components/layout/Sidebar"
import { FloatingTimer } from '@/components/features/notification/FloatingTimer'

export default function Home() {
  const { tasks, addTask, deleteTask, toggleTask, editTask, updatePriority } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')

  const priorityOrder = {
    high: 1,
    medium: 2,
    low: 3,
  }

  const completedTasks = tasks.filter(task => task.completed)
  const activeTasks = tasks.filter(task => !task.completed)
  const filteredTasks = tasks
    .filter(task => !task.completed)
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  const handleRedoTask = (id: string) => {
    toggleTask(id)
  }

  return (
    <>
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar completedTasks={completedTasks} onRedoTask={handleRedoTask} />
      <main className="w-full lg:ml-64 p-4 lg:p-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl lg:text-4xl font-bold">Task Manager</h1>
        <ThemeSwitcher />
      </div>
      
      <TaskForm onAddTask={addTask} />

      <SearchBar 
    searchQuery={searchQuery} 
    setSearchQuery={setSearchQuery} />

      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask}
        onEditTask={editTask}
      />
    </main>
   </div>
   <FloatingTimer tasks={tasks} />
   </>
  )
}
