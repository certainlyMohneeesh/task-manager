'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/Task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    }
    return [];
  });
  
// Persist tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Task['priority'], dueDate: Date, dueTime: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      priority,
      createdAt: new Date(),
      dueDate,
      dueTime
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id: string, title: string, priority: Task['priority']) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, title, priority }
        : task
    ))
  };

  const updatePriority = (taskId: string, newPriority: Task['priority']) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, newPriority }
        : task
    ))
  };

  return { tasks, addTask, deleteTask, toggleTask, editTask, updatePriority };
};
