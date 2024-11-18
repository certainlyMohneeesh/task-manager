'use client'

import { useEffect } from 'react'

const TASK_UPDATE_EVENT = 'TASK_UPDATE_EVENT'

export const useTaskSync = (callback: () => void) => {
  useEffect(() => {
    const handleUpdate = () => callback()
    window.addEventListener(TASK_UPDATE_EVENT, handleUpdate)
    return () => window.removeEventListener(TASK_UPDATE_EVENT, handleUpdate)
  }, [callback])
}

export const emitTaskUpdate = () => {
  window.dispatchEvent(new Event(TASK_UPDATE_EVENT))
}
