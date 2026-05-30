import {
  FETCH_TASKS_SUCCESS,
  CREATE_TASK_SUCCESS,
  UPDATE_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  CREATE_TASK_OPTIMISTIC,
  UPDATE_TASK_OPTIMISTIC,
  DELETE_TASK_OPTIMISTIC,
} from '../actions/taskActions';

const initialState = {
  byId: {},
  allIds: [],
};

const tasksReducer = (state = initialState, action) => { 
  switch (action.type) {
    case FETCH_TASKS_SUCCESS: {
      const byId = {};
      const allIds = [];

      action.payload.forEach((task) => {
        byId[task.id] = task;
        allIds.push(task.id);
      });

      return {
        byId,
        allIds,
      };
    }

    case CREATE_TASK_OPTIMISTIC: {
  const task = action.payload;

  return {
    byId: {
      ...state.byId,
      [task.id]: task,
    },

    allIds: [...state.allIds, task.id],
  };
}

case CREATE_TASK_SUCCESS: {
  const task = action.payload;

  const tempId = state.allIds.find((id) =>
    id.toString().startsWith('temp-')
  );

  const updatedById = { ...state.byId };

  if (tempId) {
    delete updatedById[tempId];
  }

  updatedById[task.id] = task;

  return {
    byId: updatedById,

    allIds: tempId
      ? state.allIds.map((id) =>
          id === tempId ? task.id : id
        )
      : [...state.allIds, task.id],
  };
}

    case UPDATE_TASK_OPTIMISTIC:
    case UPDATE_TASK_SUCCESS: {
      const task =
        action.payload.updates || action.payload;

      const taskId =
        action.payload.taskId || task.id;

      return {
        ...state,

        byId: {
          ...state.byId,

          [taskId]: {
            ...state.byId[taskId],
            ...task,
          },
        },
      };
    }

    case DELETE_TASK_OPTIMISTIC:
    case DELETE_TASK_SUCCESS: {
      const taskId = action.payload;

      const updatedById = { ...state.byId };

      delete updatedById[taskId];

      return {
        byId: updatedById,

        allIds: state.allIds.filter(
          (id) => id !== taskId
        ),
      };
    }

    default:
      return state;
  }
};

export default tasksReducer;