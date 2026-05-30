// Dynamic Task Form Component
// TODO: Implement complex form with React Hook Form

import React, { useEffect, useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { TASK_TYPES, PRIORITIES, BUG_SEVERITIES } from '../api/mockApi';

// TODO: Implement TaskForm component
// Requirements:
// 1. Dynamic fields based on task type
// 2. Form validation with custom rules
// 3. Field arrays for subtasks and acceptance criteria
// 4. Integration with Redux for data and state
// 5. Auto-save functionality
// 6. File attachment simulation

const TaskForm = ({ 
  isOpen, 
  mode, // 'create' or 'edit'
  initialData = null,
  onSubmit,
  onClose,
  users = [],
  projects = [],
  loading = false 
}) => {
  
  
  // TODO: Configure defaultValues, validation mode, and form options
  const defaultValues = {
    title: '',
    taskType: 'Bug',
    priority: 'Medium',
    projectId: '',
    assigneeId: '',
    description: '',
    dueDate: '',
    severity: 'Medium',
    stepsToReproduce: '',
    businessValue: '',
    acceptanceCriteria: [{ value: '' }],
    currentBehavior: '',
    proposedBehavior: '',
    researchQuestions: [{ value: '' }],
    expectedOutcomes: '',
    subtasks: [],
  };

// TODO: Setup React Hook Form with useForm hook
   const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onChange',
  });

  
  // TODO: Setup useFieldArray for subtasks and acceptance criteria
  const {
    fields: subtaskFields,
    append: addSubtask,
    remove: removeSubtask,
  } = useFieldArray({
    control,
    name: 'subtasks',
  });

  const {
    fields: criteriaFields,
    append: addCriteria,
    remove: removeCriteria,
  } = useFieldArray({
    control,
    name: 'acceptanceCriteria',
  });

  const {
    fields: questionFields,
    append: addQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: 'researchQuestions',
  });
  
  // TODO: Watch task type and project changes for dynamic behavior
  const taskType = watch('taskType');
  const selectedProjectId = watch('projectId');
  const formValues = watch();
  
  // TODO: Filter available users based on selected project
  const filteredUsers = useMemo(() => {
    if (!selectedProjectId) return users;

    return users.filter((user) =>
      user.projectIds?.includes(selectedProjectId)  
    );
  }, [users, selectedProjectId]);
  
  // TODO: Implement auto-save functionality to localStorage
  useEffect(() => {
    if (!isOpen) return;

    if (mode === 'edit' && initialData) {
      reset({
        ...defaultValues,
        ...initialData,
        acceptanceCriteria:
          initialData.acceptanceCriteria?.map((item) => ({
            value: item,
          })) || [{ value: '' }],
        researchQuestions:
          initialData.researchQuestions?.map((item) => ({
            value: item,
          })) || [{ value: '' }],
        subtasks: initialData.subtasks || [],
      });
    }
    if (mode === 'create') {
      // const savedDraft = localStorage.getItem('taskFormDraft');
      // reset(savedDraft ? JSON.parse(savedDraft) : defaultValues);
      reset(defaultValues);
      
    }
  }, [isOpen, mode, initialData, reset]);

  useEffect(() => {
    if (isOpen && mode === 'create') {
      localStorage.setItem('taskFormDraft', JSON.stringify(formValues));
    }
  }, [formValues, isOpen, mode]);
  
  // TODO: Restore form data from localStorage on mount

  const submitHandler = (data) => {
    const finalData = {
      ...data,
      acceptanceCriteria: data.acceptanceCriteria
        ?.map((item) => item.value)
        .filter(Boolean),

      researchQuestions: data.researchQuestions
        ?.map((item) => item.value)
        .filter(Boolean),

      subtasks: data.subtasks?.filter((item) => item.title),
    };

    onSubmit(finalData);
    localStorage.removeItem('taskFormDraft');
  };

  // TODO: Render dynamic fields based on task type
   const renderDynamicFields = () => {
    switch (taskType) {
      case 'Bug':
        return (
          <>
            <div className="form-group">
              <label>Severity *</label>
              <select {...register('severity', { required: true })}>
                {BUG_SEVERITIES.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Steps to Reproduce</label>
              <textarea
                placeholder="1. Step one&#10;2. Step two&#10;3. Expected vs actual result"
                {...register('stepsToReproduce')}
              />
            </div>
          </>
        );

      case 'Feature':
        return (
          <>
            <div className="form-group">
              <label>Business Value</label>
              <textarea
                placeholder="Explain business value..."
                {...register('businessValue')}
              />
            </div>

            <div className="form-group">
              <label>Acceptance Criteria</label>

              {criteriaFields.map((field, index) => (
                <div key={field.id} className="array-field">
                  <input
                    type="text"
                    placeholder="Enter acceptance criteria"
                    {...register(`acceptanceCriteria.${index}.value`)}
                  />

                  <button
                    type="button"
                    onClick={() => removeCriteria(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addCriteria({ value: '' })}
              >
                Add Criteria
              </button>
            </div>
          </>
        );

      case 'Enhancement':
        return (
          <>
            <div className="form-group">
              <label>Current Behavior</label>
              <textarea
                placeholder="Current behavior..."
                {...register('currentBehavior')}
              />
            </div>

            <div className="form-group">
              <label>Proposed Behavior</label>
              <textarea
                placeholder="Proposed behavior..."
                {...register('proposedBehavior')}
              />
            </div>
          </>
        );

      case 'Research':
        return (
          <>
            <div className="form-group">
              <label>Research Questions</label>

              {questionFields.map((field, index) => (
                <div key={field.id} className="array-field">
                  <input
                    type="text"
                    placeholder="Enter research question"
                    {...register(`researchQuestions.${index}.value`)}
                  />

                  <button
                    type="button"
                    onClick={() => removeQuestion(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addQuestion({ value: '' })}
              >
                Add Question
              </button>
            </div>

            <div className="form-group">
              <label>Expected Outcomes</label>
              <textarea
                placeholder="Expected outcomes..."
                {...register('expectedOutcomes')}
              />
            </div>
          </>
        );

      default:
        return null;
    }
   };

  if (!isOpen) return null;

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <div className="task-form-header">
          <h2>{mode === 'create' ? 'Create New Task' : 'Edit Task'}</h2>
          <button onClick={onClose}>×</button>
        </div>

        <form 
        onSubmit={handleSubmit(onSubmit)}
        >
          {/* TODO: Implement form fields */}
          
          {/* Basic Fields */}
          <div className="form-group">
            <label>Title *</label>
            {/* TODO: Add title input with validation */}
             <input
              type="text"
              placeholder="Enter task title..."
               {...register('title', {
                required: 'Title is required',
                minLength: {
                  value: 3,
                  message: 'Minimum 3 characters required',
                },
              })}
            />
          </div>

          <div className="form-group">
            <label>Task Type *</label>
            {/* TODO: Add task type dropdown */}
             <select {...register('taskType', { required: true })}>
                {TASK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Priority *</label>
            {/* TODO: Add priority dropdown */}
             <select {...register('priority', { required: true })}>
                {PRIORITIES.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Project</label>
            {/* TODO: Add project dropdown */}
             <select {...register('projectId')}>
               <option value="">Select a project...</option>
                {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Assignee</label>
            {/* TODO: Add assignee dropdown (filtered by project) */}
            <select {...register('assigneeId')}>
               <option value="">Unassigned</option>
                {filteredUsers.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            {/* TODO: Add description textarea */}
            <textarea
              placeholder="Enter task description..."
              {...register('description')}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>
            {/* TODO: Add date input */}
             <input type="date" {...register('dueDate')} />
          </div>

          {/* Dynamic Fields */}
          {renderDynamicFields()}

          {/* Subtasks */}
          <div className="form-group">
            <label>Subtasks</label>
            {/* TODO: Implement field array for subtasks */}
            {subtaskFields.map((field, index) => (
             <div key={field.id} className="array-field">
                <input
                  type="text"
                  placeholder="Enter subtask"
                  {...register(`subtasks.${index}.title`)}
                />

                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                >
                  Remove
                </button>
              </div>
              ))}
               <button
              type="button"
              onClick={() =>
                addSubtask({
                  title: '',
                })
              }
            >
              Add Subtask
            </button>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" 
            disabled={loading || !isValid}
            >
              {loading ? 'Saving...' : mode === 'create' ? 'Create Task' : 'Update Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;