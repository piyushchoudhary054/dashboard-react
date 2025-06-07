export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  assignee: string;
  dueDate: string;
  tags: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'meeting' | 'deadline' | 'event';
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface MetricData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}