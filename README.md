# Task Manager Application

A modern, feature-rich task management application built with Next.js and shadcn/ui components.

## Features

### Task Management
- Create tasks with title, priority levels, due date, and time
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- View completed tasks in sidebar
- Restore completed tasks

### Organization
- Priority-based task sorting (High, Medium, Low)
- Search functionality for quick task finding
- Clean separation of active and completed tasks
- Date and time tracking for each task

### User Experience
- Dark/Light mode toggle
- Toast notifications for actions
- Smooth animations
- Responsive design
- Intuitive calendar picker
- Real-time updates

## Setup and Launch
1. Clone the repository:
```bash
git clone [repository-url]

2. Install dependencies:
```bash
npm install --legacy-peer-deps or yarn install

3. Start the development server:
```bash
npm run dev or yarn dev

4. Open your browser and navigate to http://localhost:3000


## Development Assumptions
- User authentication not implemented
- Modern browser support required
- Local storage used for data persistence
- Single user environment
- Desktop-first design approach
- English language interface

## Screenshots
- ![Home page](public/screenshots/UI%20Task-Manager.png?raw=true "UI Home Page")
- ![Home page](public/screenshots/Light%20mode%20-%20UI.png?raw=true "UI Lightmode")
- ![Task List](public/screenshots/Task%20List.png?raw=true "Task List")
- ![Search bar](public/screenshots/Search%20Bar.png?raw=true "Search Bar")
- ![Sidebar](public/screenshots/Completed%20tasks%20-%20%20Sidebar.png?raw=true "Completed Tasks")
- ![Edit Dialog](public/screenshots/Edit-Dialog.png?raw=true "Edit Dialog")
- ![Task Toast](public/screenshots/Task%20Toaster.png?raw=true "Task Toast")



## Tech Stack
- Next.js 14
- React 19
- Typescript
- shadcn/ui components
- Tailwind CSS
- React
- Framer Motion
- date-fns
- Lucide Icons
