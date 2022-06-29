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

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

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
        name="creator"
        variant="outlined"
        label="Creator"
        fullWidth
        value={postData.creator}
        onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
      />
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

//   const MyPaper = styled("Paper")({});
//   const MyForm = styled("form")({
//     padding: 25,
//     backgroundColor: "white",
//     boxShadow: " 0 4px 8px 0 rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)",
//   });
//   const MyDiv = styled("div")({
// marginTop: "8px",
// marginBottom: "8px",
//   });
//   const MyButton = styled("Button")({
//     marginLeft: "15px",
//   });
//   const MyTextField = styled("TextField")({
//     marginBottom: 5,
//   });

//   const handleSubmit = (e) => {
//     // e.preventDefault();
//     // dispatch(createPost(postData));
//   };
//   const clear = () => {};

//   return (
//     <MyPaper>
//       <MyForm>
//         <Typography variant="h6">Create a Memory</Typography>
//         <TextField
//           style={{ marginTop: 8 }}
//           name="creator"
//           variant="outlined"
//           label="Creator"
//           //fullWidth
//           value={postData.creator}
//           onChange={(e) =>
//             setPostData({ ...postData, creator: e.target.value })
//           }
//         />
//         <TextField
//           style={{ marginTop: 8 }}
//           name="title"
//           variant="outlined"
//           label="Title"
//           fullWidth
//           value={postData.title}
//           onChange={(e) => setPostData({ ...postData, title: e.target.value })}
//         />
//         <TextField
//           style={{ marginTop: 8 }}
//           name="message"
//           variant="outlined"
//           label="Message"
//           fullWidth
//           value={postData.message}
//           onChange={(e) =>
//             setPostData({ ...postData, message: e.target.value })
//           }
//         />
//         <TextField
//           style={{ marginTop: 8 }}
//           name="tags"
//           variant="outlined"
//           label="Tags"
//           fullWidth
//           value={postData.tags}
//           onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
//         />
//         <MyDiv>
//           <FileBase
//             type="file"
//             multiple={false}
//             onDone={({ base64 }) =>
//               setPostData({ ...postData, selectedFile: base64 })
//             }
//           />

//           {/*              setPostData({ ...postData, selectedFile: base64 })
//            */}
//         </MyDiv>
// <Button
//   style={{ marginBottom: 5 }}
//   variant="contained"
//   color="primary"
//   size="large"
//   type="submit"
//   fullWidth
//   onSubmit={handleSubmit}
// >
//   Submit
// </Button>
// <Button
//   variant="contained"
//   color="error"
//   size="small"
//   onClick={clear}
//   fullWidth
// >
//   Clear
// </Button>
//       </MyForm>
//     </MyPaper>
//   );
// };
