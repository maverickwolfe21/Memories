import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { styled } from "@mui/system";

import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((post) => post._id === currentId) : null
  );

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.name }));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if (!user?.name) {
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please sign in to create and interact with memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: 20,
        backgroundColor: "white",
        boxShadow:
          " 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
      }}
    >
      <h2>{currentId ? "Editing Memory" : "Create a Memory"}</h2>

      <TextField
        style={{ marginTop: 8 }}
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <TextField
        style={{ marginTop: 8 }}
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <TextField
        style={{ marginTop: 8 }}
        name="tags"
        variant="outlined"
        label="Tags"
        fullWidth
        value={postData.tags}
        onChange={(e) => {
          setPostData({ ...postData, tags: e.target.value.split(",") });
        }}
      />
      <div style={{ marginTop: "8px", marginBottom: "8px" }}>
        <FileBase
          name="selectedFile"
          variant="outlined"
          label="Select a File"
          fullWidth
          value={postData.selectedFile}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
        <Button
          style={{ marginTop: 8, marginBottom: 5 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          onSubmit={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </div>
    </form>
  );
};

export default Form;
