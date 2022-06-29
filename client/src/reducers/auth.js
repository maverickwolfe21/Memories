import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = [], action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, state: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, state: null };
    default:
      return state;
  }
};

export default authReducer;
