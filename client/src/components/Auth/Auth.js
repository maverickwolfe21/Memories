import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  TextField,
  Typography,
  Container,
} from "@mui/material";

import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../../actions/auth";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Input from "./Input";
import Icon from "./icon";

import "./styles.css";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [isSignup, setIsSignup] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const handleCallbackResponse = (res) => {
    console.log("Encoded JWT ID token " + res?.credential);
    var userObject = jwt_decode(res?.credential);

    try {
      dispatch({ type: "AUTH", data: userObject });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "931828478063-er47dgirp02e8jn35oql3tjmtvfjoqhp.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  useEffect(() => {}, [showPassword, isSignup]);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents refresh
    if (isSignup) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: "AUTH", data: { result, token } });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Container className="container" component="main" maxWidth="xs">
      <Paper className="paper" elevation={3}>
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className="form" onSubmit={handleSubmit}>
          <Grid type="container" spacing={2}>
            {isSignup && (
              <div className="names">
                <Input
                  autoFocus
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </div>
            )}

            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
              half
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              handleChange={handleChange}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleShowPassword={handleShowPassword}
                handleChange={handleChange}
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <div id="signInDiv"></div>
          <Grid className="signHelp" container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
