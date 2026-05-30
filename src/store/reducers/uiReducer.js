// store/reducers/uiReducer.js

import {
  OPEN_TASK_FORM,
  CLOSE_TASK_FORM,
  SET_FORM_MODE,
   SET_FILTERS,
} from '../actions/uiActions';

const initialState = {
  taskForm: {
    isOpen: false,
    mode: 'create',
    taskId: null,
  },
  filters: {
    projectId: null,
    assigneeId: null,
    status: 'all',
    taskType: 'all',
    search: '',
  },
   loading: {
    tasks: false,
  },
  errors: {
    tasks: null,
    form: null,
  },
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_TASK_FORM:
      return {
        ...state,
        taskForm: {
          isOpen: true,
          mode: action.payload.mode,
          taskId: action.payload.taskId,
        },
      };

    case CLOSE_TASK_FORM:
      return {
        ...state,
        taskForm: {
          isOpen: false,
          mode: 'create',
          taskId: null,
        },
      };
    case SET_FORM_MODE:
      return {
        ...state,

        taskForm: {
          ...state.taskForm,
          mode: action.payload.mode,
          taskId: action.payload.taskId,
        },
      }; 

    case SET_FILTERS:
      return {
        ...state,

        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default uiReducer;