import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";

import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { styled } from "@mui/system";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();

  const MyCard = styled("Card")({
    marginLeft: "15px",
  });
  const MyCardMedia = styled("CardMedia")({
    marginLeft: "15px",
  });
  const Overlay = styled("div")({
    marginLeft: "15px",
  });
  const Overlay2 = styled("div")({
    color: "black",
  });
  const Details = styled("div")({
    marginLeft: "15px",
  });
  const Title = styled("Typography")({
    marginLeft: "15px",
  });

  return (
    <Card>
      <CardMedia
        style={{
          height: 0,
          paddingTop: "60%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundBlendMode: "lighten",
        }}
        image={post.selectedFile}
        title={post.title}
      ></CardMedia>
      <Overlay>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2" color="textSecondary">
          {moment(post.createdAt).fromNow()}
        </Typography>
        <Typography variant="body2" fontSize={20}>
          {post.title}
        </Typography>
        <Overlay2>
          <Button
            style={{ color: "black" }}
            size="small"
            onClick={() => setCurrentId(post._id)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </Overlay2>
      </Overlay>
      <Details>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </Details>
      <CardContent>
        <Title variant="h5" gutterBottom>
          {post.message}
        </Title>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" />
          Like &nbsp; {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
