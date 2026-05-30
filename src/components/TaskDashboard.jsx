// Main Dashboard Component
// TODO: Implement the main container component

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';

// TODO: Import selectors and actions
import { 
  selectAllTasks,
  selectFilteredTasks,
  selectTaskFormState,
  selectUsers,
  selectProjects,
  selectLoading,
  selectFilters,
  selectErrors
} from '../store/selectors';

import {
  fetchTasksRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from '../store/actions/taskActions';

import {
  openTaskForm,
  closeTaskForm,
  setFilters
} from '../store/actions/uiActions';

import { mockProjects, mockUsers } from '../api/mockApi';


const TaskDashboard = () => {
  const dispatch = useDispatch();

  // TODO: Connect to Redux state using useSelector
  const tasks = useSelector(selectAllTasks);
  const users = useSelector(selectUsers);
  const projects = useSelector(selectProjects);
   console.log("Projects", projects);
  console.log("Users", users);
  const taskForm = useSelector(selectTaskFormState);
  const filters = useSelector(selectFilters);
 
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);
  
  // TODO: Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchTasksRequest(filters));
  }, [dispatch, filters]);
  // TODO: Refetch tasks when filters change

  // TODO: Implement event handlers
  const handleCreateTask = () => {
    // TODO: Dispatch open form action for create mode
    dispatch(openTaskForm('create', null));
  };

  const handleEditTask = (taskId) => {
    // TODO: Dispatch open form action for edit mode
    dispatch(openTaskForm('edit', taskId));
  };

  const handleDeleteTask = (taskId) => {
    // TODO: Show confirmation and dispatch delete action
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (confirmed) {
      dispatch(deleteTaskRequest(taskId));
    }
  };

  const handleFormSubmit = (formData) => {
    // TODO: Dispatch create or update action based on form mode
     if (
      taskForm.mode === 'edit' &&
      taskForm.taskId
    ) {
      dispatch(
        updateTaskRequest(
          taskForm.taskId,
          formData
        )
      );
    } else {
      dispatch(
        createTaskRequest(formData)
      );
    }
  };

  const handleFormClose = () => {
    // TODO: Dispatch close form action and clear localStorage
     dispatch(closeTaskForm());
      localStorage.removeItem(
      'taskFormDraft'
    );
  };

  const handleFiltersChange = (newFilters) => {
    // TODO: Dispatch filter change action
    dispatch(setFilters(newFilters));
  };

  const selectedTask =
    taskForm.taskId &&
    tasks.find(
      (task) =>
        task.id === taskForm.taskId
    );

  return (
    <div className="task-dashboard">
      <header className="dashboard-header">
        <h1>Task Management Dashboard</h1>
        <button 
          className="create-task-btn"
          onClick={handleCreateTask}
        >
          + Create Task
        </button>
      </header>

      {/* TODO: Show error messages */}
      {errors.tasks && (
        <div className="error-banner">
          Error: {errors.tasks}
        </div>
      )}

      <FilterBar
        filters={filters}
        projects={projects}
        users={users}
        onFiltersChange={handleFiltersChange}
      />

      <TaskList
        tasks={tasks}
        loading={loading.tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskForm
        isOpen={taskForm.isOpen}
        mode={taskForm.mode}
        initialData={
          selectedTask || null
        }        
        users={mockUsers}
        projects={mockProjects}
        loading={loading.tasks}
        onSubmit={handleFormSubmit}
        onClose={handleFormClose}
      />
    </div>
  );
};

export default TaskDashboard;