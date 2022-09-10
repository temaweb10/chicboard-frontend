const defaultState = {
  isAuth: false,
  currentUser: {},
};

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, isAuth: true, currentUser: action.payload };

    default:
      return state;
  }
};
