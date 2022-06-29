import * as api from "../api";
import { AUTH } from "../constants/actionTypes";

const signIn = (formData, navigate) => async (dispatch) => {
  try {
    // log in user
    const { data } = await api.signIn(formData);

    dispatch({ type: "AUTH", data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
const signUp = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: "AUTH", data });

    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export { signIn, signUp };
