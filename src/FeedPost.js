import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import {
  DeleteForeverRounded,
  Send,
  ShareRounded,
  Sms,
  ThumbDownRounded,
  ThumbUpAlt,
} from "@material-ui/icons";
import ReactTimeago from "react-timeago";
import React, { forwardRef } from "react";
import "./FeedPost.css";
import { db } from "./firebase";
import { useState } from "react";
const FeedPost = forwardRef(
  ({ id, avatar, name, timestamp, postText, postMedia, likes }, ref) => {
    const [state, setState] = useState(true);
    const likePost = () => {
      db.collection("LinkedIn")
        .doc(id)
        .set({ likes: likes + 1 }, { merge: true });
      setState(false);
    };
    const unlikePost = () => {
      db.collection("LinkedIn")
        .doc(id)
        .set({ likes: likes - 1 }, { merge: true });
      setState(true);
    };
    return (
      <div ref={ref} className="FeedPost">
        <div className="postHeader">
          <div className="postHeaderLeft">
            <Avatar className="postAvatar" src={avatar} alt="" />
            <div className="posterDetails">
              <h5 className="posterName">{name}</h5>
              <p className="posterTime">
                <ReactTimeago
                  date={new Date(timestamp?.toDate()).toUTCString()}
                />
              </p>
            </div>
          </div>
          <Tooltip title="Delete Post">
            <IconButton
              className="deleteIcon"
              onClick={(event) => {
                db.collection("LinkedIn").doc(id).delete();
              }}
            >
              <DeleteForeverRounded />
            </IconButton>
          </Tooltip>
        </div>
        <p className="postText">{postText}</p>
        {postMedia && <img className="imageMediaPost" src={postMedia} alt="" />}
        {likes && (
          <div className="postLikes">
            <ThumbUpAlt className="postFooterIcon" />
            <p>{likes}</p>
          </div>
        )}
        <div className="postFooters">
          {state ? (
            <div className="footerPost" onClick={likePost}>
              <ThumbUpAlt />
              <p>Like</p>
            </div>
          ) : (
            <div className="footerPost" onClick={unlikePost}>
              <ThumbDownRounded />
              <p>Dislike</p>
            </div>
          )}

          <div className="footerPost">
            <Sms />
            <p>Comment</p>
          </div>
          <div className="footerPost">
            <ShareRounded />
            <p>Share</p>
          </div>
          <div className="footerPost">
            <Send />
            <p>Send</p>
          </div>
        </div>
      </div>
    );
  }
);

export default FeedPost;
