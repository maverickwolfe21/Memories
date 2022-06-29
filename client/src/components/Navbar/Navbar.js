import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Button,
  AvatarGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

import memories from "../../assets/images/memories.png";

import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./styles.css";

const MyAppBar = styled("AppBar")({
  borderRadius: 15,
  margin: "30px 0",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 15,
  border: "2px solid black",
  boxShadow: "5px 5px 4px #888888",
});

const MyTypography = styled("Typography")({
  color: "rgba(0,183,255, 1)",
  fontSize: 45,
});

const MyImage = styled("img")({
  marginLeft: "15px",
});

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log(user);

  useEffect(() => {
    //JWT..
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    <MyAppBar position="static" color="inherit">
      <div className="navbar">
        <MyTypography variant="h1" align="center">
          Memories
        </MyTypography>
        <MyImage src={memories} alt="memories-logo" height={60} width={60} />
      </div>
      <Toolbar>
        {user ? (
          <div>
            <Avatar alt={user.name} src={user.picture}>
              {user.given_name.charAt(0)}
            </Avatar>
            <Typography variant="h6">{user.name}</Typography>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        ) : (
          <div>
            <Button
              component={Link}
              to="/auth"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </MyAppBar>
  );
};
