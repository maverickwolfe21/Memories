import React, { useEffect, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { styled } from "@mui/system";

import { useDispatch } from "react-redux";
import { getPosts } from "./actions/posts";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./assets/images/memories.png";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const MyAppBar = styled("AppBar")({
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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

  return (
    <Container maxWidth="lg">
      <MyAppBar position="static" color="inherit">
        <MyTypography variant="h2" align="center">
          Memories
        </MyTypography>
        <MyImage src={memories} alt="memories-logo" height={60} width={60} />
      </MyAppBar>
      <Grow in>
        <Container>
          <Grid
            className="grid"
            //direction="column-reverse"
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
