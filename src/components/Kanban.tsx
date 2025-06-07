import React, { useState, useEffect } from 'react';
import { Plus, MoreHorizontal, Clock, User, X, Check, ChevronDown, ChevronUp, Trash2, Edit } from 'lucide-react';
import { tasks as initialTasks } from '../data/mockData';
import { Task } from '../types';

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-100 dark:bg-gray-700' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100 dark:bg-blue-900/20' },
  { id: 'done', title: 'Done', color: 'bg-green-100 dark:bg-green-900/20' }
];

export const Kanban: React.FC = () => {
  const [boardTasks, setBoardTasks] = useState<Task[]>(initialTasks);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [showAddForm, setShowAddForm] = useState<{ [key: string]: boolean }>({});
  const [newTask, setNewTask] = useState<{ [key: string]: Partial<Task> }>({});
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTaskId, setDeleteTaskId] = useState<string | null>(null);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState<string>('');

  // Load tasks from localStorage if available
  useEffect(() => {
    const savedTasks = localStorage.getItem('kanban-tasks');
    if (savedTasks) {
      setBoardTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(boardTasks));
  }, [boardTasks]);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: Task['status']) => {
    e.preventDefault();
    if (draggedTask) {
      setBoardTasks(prev =>
        prev.map(task =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
      setDraggedTask(null);
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400';
    }
  };

  const getTasksByStatus = (status: Task['status']) => {
    return boardTasks.filter(task => task.status === status);
  };

  const handleShowAddForm = (columnId: string) => {
    setShowAddForm(prev => ({ ...prev, [columnId]: true }));
    setNewTask(prev => ({
      ...prev,
      [columnId]: {
        title: '',
        description: '',
        priority: 'medium',
        dueDate: new Date().toISOString().slice(0, 10),
        assignee: '',
        tags: [],
        status: columnId as Task['status'],
      }
    }));
  };

  const handleAddTaskChange = (columnId: string, field: string, value: any) => {
    setNewTask(prev => ({
      ...prev,
      [columnId]: {
        ...prev[columnId],
        [field]: value,
      }
    }));
  };

  const handleAddTask = (columnId: string) => {
    const task = newTask[columnId];
    if (!task?.title) return;
    
    const newTaskObj: Task = {
      ...task,
      id: Date.now().toString(),
      tags: task.tags || [],
      status: columnId as Task['status'],
      createdAt: new Date().toISOString(),
    } as Task;
    
    setBoardTasks(prev => [...prev, newTaskObj]);
    setShowAddForm(prev => ({ ...prev, [columnId]: false }));
    setNewTask(prev => ({ ...prev, [columnId]: {} }));
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
  };

  const handleUpdateTask = () => {
    if (!editTask) return;
    
    setBoardTasks(prev =>
      prev.map(task =>
        task.id === editTask.id ? editTask : task
      )
    );
    setEditTask(null);
  };

  const handleDeleteTask = () => {
    if (!deleteTaskId) return;
    
    setBoardTasks(prev => prev.filter(task => task.id !== deleteTaskId));
    setDeleteTaskId(null);
  };

  const handleAddTag = (taskId: string) => {
    if (!tagInput.trim()) return;
    
    setBoardTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, tags: [...task.tags, tagInput.trim()] }
          : task
      )
    );
    setTagInput('');
  };

  const handleRemoveTag = (taskId: string, tagIndex: number) => {
    setBoardTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, tags: task.tags.filter((_, i) => i !== tagIndex) }
          : task
      )
    );
  };

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTask(prev => prev === taskId ? null : taskId);
  };

  return (
    <div className="p-6">
      {/* Edit Task Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Edit Task</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                <select
                  value={editTask.priority}
                  onChange={(e) => setEditTask({ ...editTask, priority: e.target.value as Task['priority'] })}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={editTask.dueDate}
                  onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Assignee</label>
                <input
                  type="text"
                  value={editTask.assignee}
                  onChange={(e) => setEditTask({ ...editTask, assignee: e.target.value })}
                  className="w-full p-2 rounded border dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {editTask.tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
                      <span className="text-blue-800 dark:text-blue-400 text-sm">{tag}</span>
                      <button 
                        onClick={() => setEditTask({
                          ...editTask,
                          tags: editTask.tags.filter((_, i) => i !== index)
                        })}
                        className="ml-1 text-blue-800 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (setEditTask({
                      ...editTask,
                      tags: [...editTask.tags, tagInput.trim()]
                    }), setTagInput(''))}
                    placeholder="Add tag and press Enter"
                    className="flex-1 p-2 rounded-l border dark:bg-gray-700"
                  />
                  <button
                    onClick={() => (setEditTask({
                      ...editTask,
                      tags: [...editTask.tags, tagInput.trim()]
                    }), setTagInput(''))}
                    className="bg-blue-500 text-white px-3 rounded-r"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditTask(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTaskId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Delete Task</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteTaskId(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTask}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Kanban Board</h1>
          <p className="text-gray-600 dark:text-gray-400">Organize and track your team's work progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <div
            key={column.id}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id as Task['status'])}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  column.id === 'todo' ? 'bg-gray-400' :
                  column.id === 'in-progress' ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  {getTasksByStatus(column.id as Task['status']).length}
                </span>
              </div>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {getTasksByStatus(column.id as Task['status']).map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task)}
                  className={`bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 cursor-move hover:shadow-md transition-shadow ${
                    draggedTask?.id === task.id ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => handleEditTask(task)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => setDeleteTaskId(task.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => toggleTaskExpansion(task.id)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors text-gray-400 hover:text-gray-600"
                      >
                        {expandedTask === task.id ? (
                          <ChevronUp className="h-3 w-3" />
                        ) : (
                          <ChevronDown className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">{task.title}</h4>
                  
                  {expandedTask === task.id && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
                      
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2 mb-3">
                          {task.tags.map((tag, index) => (
                            <div key={index} className="flex items-center bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
                              <span className="text-blue-800 dark:text-blue-400 text-xs">{tag}</span>
                              <button 
                                onClick={() => handleRemoveTag(task.id, index)}
                                className="ml-1 text-blue-800 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center mb-2">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && (handleAddTag(task.id), setTagInput(''))}
                          placeholder="Add tag"
                          className="flex-1 p-1 text-xs rounded-l border dark:bg-gray-600"
                        />
                        <button
                          onClick={() => (handleAddTag(task.id), setTagInput(''))}
                          className="bg-blue-500 text-white px-2 py-1 text-xs rounded-r"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{task.assignee?.split(' ')[0] || 'Unassigned'}</span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Task Form */}
              {showAddForm[column.id] ? (
                <div className="space-y-2 p-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <input
                    type="text"
                    placeholder="Title"
                    value={newTask[column.id]?.title || ''}
                    onChange={(e) => handleAddTaskChange(column.id, 'title', e.target.value)}
                    className="w-full p-2 text-sm rounded border dark:bg-gray-700"
                  />
                  <textarea
                    placeholder="Description"
                    value={newTask[column.id]?.description || ''}
                    onChange={(e) => handleAddTaskChange(column.id, 'description', e.target.value)}
                    className="w-full p-2 text-sm rounded border dark:bg-gray-700"
                  />
                  <select
                    value={newTask[column.id]?.priority || 'medium'}
                    onChange={(e) => handleAddTaskChange(column.id, 'priority', e.target.value)}
                    className="w-full p-2 text-sm rounded border dark:bg-gray-700"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                  <input
                    type="date"
                    value={newTask[column.id]?.dueDate || ''}
                    onChange={(e) => handleAddTaskChange(column.id, 'dueDate', e.target.value)}
                    className="w-full p-2 text-sm rounded border dark:bg-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Assignee"
                    value={newTask[column.id]?.assignee || ''}
                    onChange={(e) => handleAddTaskChange(column.id, 'assignee', e.target.value)}
                    className="w-full p-2 text-sm rounded border dark:bg-gray-700"
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowAddForm(prev => ({ ...prev, [column.id]: false }))}
                      className="flex-1 p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleAddTask(column.id)}
                      className="flex-1 p-2 bg-blue-500 text-white rounded"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleShowAddForm(column.id)}
                  className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Task</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};