// UI action creators
// TODO: Implement UI state management actions

// Action Types
export const OPEN_TASK_FORM = "OPEN_TASK_FORM";
export const CLOSE_TASK_FORM = "CLOSE_TASK_FORM";
export const SET_FORM_MODE = "SET_FORM_MODE";

export const SET_FILTERS = "SET_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_SEARCH = "SET_SEARCH";

export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const CLEAR_ERROR = "CLEAR_ERROR";

// TODO: Implement action creators for UI state
// Requirements:
// 1. Task form management (open/close, mode)
// 2. Filter management
// 3. Loading states
// 4. Error handling

// TODO: Create action creators for form state, filters, loading, errors

// Open Task Form
export const openTaskForm = (mode = "create", taskId = null) => ({
  type: OPEN_TASK_FORM,

  payload: {
    mode,
    taskId,
  },
});

// Close Task Form
export const closeTaskForm = () => ({
  type: CLOSE_TASK_FORM,
});

export const setFormMode = (mode, taskId = null) => ({
  type: SET_FORM_MODE,

  payload: {
    mode,
    taskId,
  },
});

// Set Filters
export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

// Clear Filters
export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});

// Set Search
export const setSearch = (searchText) => ({
  type: SET_SEARCH,
  payload: searchText,
});

// Set Loading
export const setLoading = (key, value) => ({
  type: SET_LOADING,

  payload: {
    key,
    value,
  },
});

// Set Error
export const setError = (key, error) => ({
  type: SET_ERROR,

  payload: {
    key,
    error,
  },
});

// Clear Error
export const clearError = (key) => ({
  type: CLEAR_ERROR,
  payload: key,
});
