export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    createdAt: Date;
    dueDate: Date
    dueTime: string
  }
  