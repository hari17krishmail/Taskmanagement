// Individual Task Card Component
// TODO: Implement task card display

import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  
  // TODO: Implement task card functionality
  // Requirements:
  // 1. Display task information in a card layout
  // 2. Show different styles based on priority/status
  // 3. Handle optimistic updates (show loading/pending states)
  // 4. Show task-type specific information
  // 5. Action buttons (edit, delete)

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': '#22c55e',
      'Medium': '#f59e0b', 
      'High': '#ef4444',
      'Critical': '#dc2626'
    };
    return colors[priority] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Todo': '#6b7280',
      'In Progress': '#3b82f6',
      'Review': '#f59e0b',
      'Done': '#22c55e'
    };
    return colors[status] || '#6b7280';
  };

  // TODO: Check if this is an optimistic update
  const isOptimistic =
    task.id?.toString().startsWith('temp-') ||
    task.isOptimistic ||
    task.pending;

  return (
    <div className={`task-card ${task.taskType?.toLowerCase()} ${
        isOptimistic
          ? 'optimistic'
          : ''
      }`}>
      {/* TODO: Show optimistic update indicator */}
      {isOptimistic && (
        <div className="optimistic-badge">
          Syncing...
        </div>
      )}

      <div className="task-card-header">
        <div className="task-meta">
          <span 
            className="task-type"
            style={{ backgroundColor: getPriorityColor(task.priority) }}
          >
            {task.taskType}
          </span>
          <span 
            className="task-status"
            style={{ color: getStatusColor(task.status) }}
          >
            {task.status}
          </span>
        </div>
        
        <div className="task-actions">
          <button onClick={onEdit} className="btn-edit">✏️</button>
          <button onClick={onDelete} className="btn-delete">🗑️</button>
        </div>
      </div>

      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        
        {task.description && (
          <p className="task-description">
            {task.description.length > 100 
              ? `${task.description.substring(0, 100)}...`
              : task.description
            }
          </p>
        )}

        {/* TODO: Show task-type specific info */}
        {task.taskType === 'Bug' && task.severity && (
          <div className="task-severity">
            Severity: <span className={`severity-${task.severity?.toLowerCase()}`}>
              {task.severity}
            </span>
          </div>
        )}

        {task.taskType === 'Feature' && task.acceptanceCriteria?.length > 0 && (
          <div className="task-criteria">
            {task.acceptanceCriteria.length} acceptance criteria
          </div>
        )}

        {/* Subtasks count */}
        {task.subtasks?.length > 0 && (
          <div className="task-subtasks">
            Subtasks: {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
          </div>
        )}
      </div>

      <div className="task-footer">
        <div className="task-assignee">
          {task.assigneeId ? `Assigned to: User ${task.assigneeId}` : 'Unassigned'}
        </div>
        
        {task.dueDate && (
          <div className={`task-due-date ${new Date(task.dueDate) < new Date() ? 'overdue' : ''}`}>
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}

        <div className="task-priority">
          Priority: <span style={{ color: getPriorityColor(task.priority) }}>
            {task.priority}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;