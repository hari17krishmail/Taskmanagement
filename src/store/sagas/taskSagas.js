// Task sagas for handling async operations
// TODO: Implement saga functions for task management

import { call, put, takeEvery, takeLatest, race, delay } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';

// TODO: Import action types and action creators
import {
  FETCH_TASKS_REQUEST,
  CREATE_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
  DELETE_TASK_REQUEST,

  fetchTasksSuccess,
  fetchTasksFailure,
  fetchUsersSuccess,
  fetchProjectsSuccess,

  createTaskSuccess,
  createTaskFailure,
  createTaskOptimistic,

  updateTaskSuccess,
  updateTaskFailure,
  updateTaskOptimistic,

  deleteTaskSuccess,
  deleteTaskFailure,
  deleteTaskOptimistic,
} from '../actions/taskActions'; 

import {
  setLoading,
  setError,
  clearError,
  closeTaskForm,
} from '../actions/uiActions';
// TODO: Implement saga functions
// Requirements:
// 1. Handle fetch tasks with error handling
// 2. Handle create task with optimistic updates
// 3. Handle update task with optimistic updates  
// 4. Handle delete task with optimistic updates
// 5. Implement retry logic for failed requests
// 6. Handle race conditions (cancel previous requests)

// Implement retry logic
function* retryApi(apiFn, ...args) {
  let lastError;

  for (let i = 0; i < 3; i++) {
    try {
      return yield call(apiFn, ...args);
    } catch (error) {
      lastError = error;
      yield delay(1000);
    }
  }

  throw lastError;
}

// TODO: Implement fetchTasksSaga - use call, put, try-catch
function* fetchTasksSaga(action) {
  try {
    yield put(setLoading('tasks', true));
    yield put(clearError('tasks'));

    const { response, timeout } = yield race({
      response: call(retryApi, mockApi.fetchTasks, action.payload),
      timeout: delay(5000),
    });

    if (timeout) {
      throw new Error('Fetch tasks request timeout');
    }

    const usersResponse = yield call(retryApi, mockApi.fetchUsers);
    const projectsResponse = yield call(retryApi, mockApi.fetchProjects);

    yield put(fetchTasksSuccess(response.data));
    yield put(fetchUsersSuccess(usersResponse.data));
    yield put(fetchProjectsSuccess(projectsResponse.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
    yield put(setError('tasks', error.message));
  } finally {
    yield put(setLoading('tasks', false));
  }
}

// TODO: Implement createTaskSaga - optimistic updates with rollback
function* createTaskSaga(action) {
  const optimisticTask = {
    ...action.payload,
    id: `temp-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'Todo',
    isOptimistic: true,
  };

  try {
    yield put(createTaskOptimistic(optimisticTask));
    yield put(setLoading('tasks', true));
    yield put(clearError('form'));

    const response = yield call(
      retryApi,
      mockApi.createTask,
      action.payload
    );

    yield put(createTaskSuccess(response.data));
    yield put(closeTaskForm());
  } catch (error) {
    yield put(createTaskFailure(error.message));
    yield put(setError('form', error.message));
  } finally {
    yield put(setLoading('tasks', false));
  }
}

// TODO: Implement updateTaskSaga - similar to create
function* updateTaskSaga(action) {
  const { taskId, updates } = action.payload;

  try {
    yield put(updateTaskOptimistic(taskId, updates));
    yield put(setLoading('tasks', true));
    yield put(clearError('form'));

    const response = yield call(
      retryApi,
      mockApi.updateTask,
      taskId,
      updates
    );

    yield put(updateTaskSuccess(response.data));
    yield put(closeTaskForm());
  } catch (error) {
    yield put(updateTaskFailure(error.message));
    yield put(setError('form', error.message));
  } finally {
    yield put(setLoading('tasks', false));
  }
}

// TODO: Implement deleteTaskSaga - with confirmation handling
function* deleteTaskSaga(action) {
  const taskId = action.payload;

  try {
    yield put(deleteTaskOptimistic(taskId));
    yield put(setLoading('tasks', true));
    yield put(clearError('tasks'));

    const response = yield call(
      retryApi,
      mockApi.deleteTask,
      taskId
    );

    yield put(deleteTaskSuccess(response.data.id));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
    yield put(setError('tasks', error.message));
  } finally {
    yield put(setLoading('tasks', false));
  }
}

// TODO: Export watcher sagas using takeLatest/takeEvery
export default function* watchTaskSagas() {
  yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
  yield takeEvery(CREATE_TASK_REQUEST, createTaskSaga);
  yield takeEvery(UPDATE_TASK_REQUEST, updateTaskSaga);
  yield takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga);
}