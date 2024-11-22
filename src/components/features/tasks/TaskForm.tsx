'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from '@/hooks/use-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import { Task } from '@/types/Task'

interface TaskFormProps {
  onAddTask: (title: string, priority: Task['priority'], date: Date, time: string) => void
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('medium')
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('')
  const [calendarOpen, setCalendarOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && date && time) {
      onAddTask(title.trim(), priority, date, time)
      toast({
        title: "Task Added",
        description: `${title} scheduled for ${format(date, "PPP")} at ${time}`,
      })
      setTitle('')
      setDate(undefined)
      setTime('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="w-full"
      />
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-[180px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate: Date | undefined) => {
                if (selectedDate) {
                    setDate(selectedDate)
                    setCalendarOpen(false)
                }
            }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[240px] justify-start text-left font-normal"
            >
              <Clock className="mr-2 h-4 w-4" />
              {time || "Select time"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-4 md:w-[320px]">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={time.split(':')[0]}
                  onValueChange={(hour) => {
                    const [_, minute] = time.split(':')
                    setTime(`${hour}:${minute}`)
                  }}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent className='max-h-[200px] overflow-y-auto'>
                    {Array.from({ length: 24 }, (_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={time.split(':')[1]}
                  onValueChange={(minute) => {
                    const [hour] = time.split(':')
                    setTime(`${hour}:${minute}`)
                  }}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Minute" />
                  </SelectTrigger>
                  <SelectContent className='max-h-[200px] overflow-y-auto'>
                    {Array.from({ length: 60 }, (_, i) => (
                      <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                        {i.toString().padStart(2, '0')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>


        <Select value={priority} onValueChange={(value: Task['priority']) => setPriority(value)}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="w-full sm:w-auto">Add Task</Button>
      </div>
    </form>
  )
}
