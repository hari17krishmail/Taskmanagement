const initialState = {
  byId: {},
  allIds: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_SUCCESS": {
      const byId = {};
      const allIds = [];

      action.payload.forEach((user) => {
        byId[user.id] = user;
        allIds.push(user.id);
      });

      return {
        byId,
        allIds,
      };
    }

    default:
      return state;
  }
};

export default usersReducer;
