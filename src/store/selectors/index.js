// Task Form
export const selectTaskFormState = (state) => state.ui.taskForm;

// selectFilteredTasks
export const selectFilteredTasks = (state) => {
  const tasks = selectAllTasks(state);
  const filters = selectFilters(state);

  return tasks.filter((task) => {
    // Project Filter
    if (filters.projectId && task.projectId !== filters.projectId) {
      return false;
    }

    // Assignee Filter
    if (filters.assigneeId && task.assigneeId !== filters.assigneeId) {
      return false;
    }

    // Status Filter
    if (
      filters.status &&
      filters.status !== "all" &&
      task.status !== filters.status
    ) {
      return false;
    }

    // Task Type Filter
    if (
      filters.taskType &&
      filters.taskType !== "all" &&
      task.taskType !== filters.taskType
    ) {
      return false;
    }

    // Search Filter
    if (filters.search) {
      const search = filters.search.toLowerCase();

      const matches =
        task.title?.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search);

      if (!matches) {
        return false;
      }
    }

    return true;
  });
};

// Filters
export const selectFilters = (state) => state.ui.filters;

// Loading
export const selectLoading = (state) => state.ui.loading;

// Errors
export const selectErrors = (state) => state.ui.errors;

export const selectAllTasks = (state) => {
  const tasks = state.entities.tasks;

  return tasks.allIds.map((id) => tasks.byId[id]);
};

// Users
export const selectUsers = (state) => {
  const users = state.entities.users;

  return users.allIds.map((id) => users.byId[id]);
};

// Projects
export const selectProjects = (state) => {
  const projects = state.entities.projects;

  return projects.allIds.map((id) => projects.byId[id]);
};
