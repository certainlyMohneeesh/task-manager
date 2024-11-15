'use client'

import { useState } from 'react'
import { TaskForm } from '@/components/features/tasks/TaskForm'
import { TaskList } from '@/components/features/tasks/TaskList'
import { useTasks } from '@/hooks/useTasks'
import { SearchBar } from "@/components/features/search/SearchBar"
import { ThemeSwitcher } from "@/components/features/theme/ThemeSwitcher"
import { Sidebar } from "@/components/layout/Sidebar"

export default function Home() {
  const { tasks, addTask, deleteTask, toggleTask, editTask } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')

  const completedTasks = tasks.filter(task => task.completed)
  const activeTasks = tasks.filter(task => !task.completed)
  const filteredTasks = tasks
    .filter(task => !task.completed)
    .filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase()))

    
  const handleRedoTask = (id: string) => {
    toggleTask(id)
  }

  return (
    <div className="flex">
      <Sidebar completedTasks={completedTasks}
      onRedoTask={handleRedoTask} />
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Task Manager</h1>
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
  )
}
