// store/reducers/uiReducer.js

import {
  OPEN_TASK_FORM,
  CLOSE_TASK_FORM,
} from '../actions/uiActions';

const initialState = {
  taskForm: {
    isOpen: false,
    mode: 'create',
    taskId: null,
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


    default:
      return state;
  }
};

export default uiReducer;