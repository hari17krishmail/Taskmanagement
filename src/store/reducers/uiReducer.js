// store/reducers/uiReducer.js

import {
  OPEN_TASK_FORM,
  CLOSE_TASK_FORM,
  SET_FORM_MODE
} from '../actions/uiActions';

const initialState = {
  taskForm: {
    isOpen: false,
    mode: 'create',
    taskId: null,
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

    default:
      return state;
  }
};

export default uiReducer;