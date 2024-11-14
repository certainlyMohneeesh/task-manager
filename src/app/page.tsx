'use client'

import { useState } from 'react'
import { TaskForm } from '@/components/features/tasks/TaskForm'
import { TaskList } from '@/components/features/tasks/TaskList'
import { useTasks } from '@/hooks/useTasks'
import { SearchBar } from "@/components/features/search/SearchBar"

export default function Home() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">Task Manager</h1>
      
      <TaskForm onAddTask={addTask} />

      <SearchBar 
    searchQuery={searchQuery} 
    setSearchQuery={setSearchQuery} 
      />

      <TaskList
        tasks={filteredTasks}
        onDeleteTask={deleteTask}
        onToggleTask={toggleTask}
      />
    </main>
  )
}
