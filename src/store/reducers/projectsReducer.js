const initialState = {
  byId: {},
  allIds: [],
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PROJECTS_SUCCESS": {
      const byId = {};
      const allIds = [];

      action.payload.forEach((project) => {
        byId[project.id] = project;
        allIds.push(project.id);
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

export default projectsReducer;
