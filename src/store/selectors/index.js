 // Task Form
export const selectTaskFormState = (state) =>
  state.ui.taskForm;



// Loading
export const selectLoading = (state) =>
  state.ui.loading;

// Errors
export const selectErrors = (state) =>
  state.ui.errors;

export const selectAllTasks = (state) => {
  const tasks = state.entities.tasks;

  return tasks.allIds.map(
    (id) => tasks.byId[id]
  );
};


// Users
export const selectUsers = (state) => {
  const users = state.entities.users;

  return users.allIds.map(
    (id) => users.byId[id]
  );
};

// Projects
export const selectProjects = (state) => {
  const projects = state.entities.projects;

  return projects.allIds.map(
    (id) => projects.byId[id]
  );
};