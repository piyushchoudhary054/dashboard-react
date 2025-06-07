import { User, Task, Event, ChartData, MetricData } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Admin',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Developer',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'active',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'Designer',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'inactive',
    lastLogin: '2024-01-14T16:45:00Z'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    role: 'Manager',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    status: 'active',
    lastLogin: '2024-01-15T11:20:00Z'
  }
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Design System Updates',
    description: 'Update the design system components with new brand guidelines',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Emily Rodriguez',
    dueDate: '2024-01-20',
    tags: ['design', 'urgent']
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate third-party payment API',
    priority: 'medium',
    status: 'todo',
    assignee: 'Michael Chen',
    dueDate: '2024-01-25',
    tags: ['development', 'backend']
  },
  {
    id: '3',
    title: 'User Testing',
    description: 'Conduct user testing for new dashboard features',
    priority: 'medium',
    status: 'todo',
    assignee: 'Sarah Johnson',
    dueDate: '2024-01-22',
    tags: ['testing', 'ux']
  },
  {
    id: '4',
    title: 'Database Optimization',
    description: 'Optimize database queries for better performance',
    priority: 'low',
    status: 'done',
    assignee: 'Michael Chen',
    dueDate: '2024-01-18',
    tags: ['development', 'performance']
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Team Standup',
    description: 'Daily team standup meeting',
    date: '2024-01-16',
    time: '09:00',
    type: 'meeting'
  },
  {
    id: '2',
    title: 'Project Deadline',
    description: 'MVP delivery deadline',
    date: '2024-01-20',
    time: '17:00',
    type: 'deadline'
  },
  {
    id: '3',
    title: 'Design Review',
    description: 'Review new design proposals',
    date: '2024-01-18',
    time: '14:00',
    type: 'meeting'
  },
  {
    id: '4',
    title: 'Company All-Hands',
    description: 'Monthly company meeting',
    date: '2024-01-25',
    time: '10:00',
    type: 'event'
  }
];

export const revenueData: ChartData[] = [
  { name: 'Jan', value: 12000 },
  { name: 'Feb', value: 15000 },
  { name: 'Mar', value: 18000 },
  { name: 'Apr', value: 16000 },
  { name: 'May', value: 22000 },
  { name: 'Jun', value: 25000 },
  { name: 'Jul', value: 28000 }
];

export const trafficData: ChartData[] = [
  { name: 'Desktop', value: 65, color: '#3B82F6' },
  { name: 'Mobile', value: 25, color: '#8B5CF6' },
  { name: 'Tablet', value: 10, color: '#10B981' }
];

export const metrics: MetricData[] = [
  {
    title: 'Total Revenue',
    value: '$145,000',
    change: '+12.5%',
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    title: 'Active Users',
    value: '12,459',
    change: '+8.2%',
    trend: 'up',
    icon: 'Users'
  },
  {
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-2.1%',
    trend: 'down',
    icon: 'TrendingUp'
  },
  {
    title: 'Page Views',
    value: '89,422',
    change: '+15.3%',
    trend: 'up',
    icon: 'Eye'
  }
];