import { Avatar } from "@material-ui/core";
import {
  AssignmentRounded,
  EventRounded,
  PhotoSizeSelectLargeRounded,
  VideocamRounded,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/counterSlice";
import FeedPost from "./FeedPost";
import "./Feeds.css";
import { db, storage } from "./firebase";
import firebase from "firebase";
import InputFeedIcon from "./InputFeedIcon";
import FlipMove from "react-flip-move";

function Feeds() {
  const user = useSelector(selectUser);
  const [MediaPhoto, setMediaPhoto] = useState(null);
  const [inputPost, setinputPost] = useState("");
  const [progress, setprogress] = useState("");
  const [posts, setposts] = useState([]);
  const [likes, setlikes] = useState(0);

  useEffect(() => {
    db.collection("LinkedIn")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setposts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        )
      );
  }, []);

  function buildPhotoSelector() {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("accept", "image/jpg, image/png");
    return fileSelector;
  }

  const attachFile = (e) => {
    e.preventDefault();
    const fileSelector = buildPhotoSelector();
    fileSelector.click();
    fileSelector.addEventListener("change", (event) => {
      const file = event.target.files[0];
      setMediaPhoto(file);
    });
  };
  const handlePost = (e) => {
    if (MediaPhoto) {
      const uploadTask = storage
        .ref(`media/${MediaPhoto}.name}`)
        .put(MediaPhoto);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setprogress(progress);
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              break;
            case firebase.storage.TaskState.RUNNING:
              break;
            default:
              console.log("..");
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            db.collection("LinkedIn").add({
              Name: user.Name,
              avatar: user.AvatarPhoto,
              postText: inputPost,
              likes: likes,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              media: downloadURL,
            });
          });
        }
      );
      setMediaPhoto(null);
    } else {
      db.collection("LinkedIn").add({
        Name: user.Name,
        avatar: user.photo,
        postText: inputPost,
        likes: likes,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  };

  return (
    <div className="Feeds">
      <div className="addPost">
        <div className="PostInput_Bar">
          <Avatar className="postInputAvatar" src={user.AvatarPhoto} alt="" />
          <input
            value={inputPost}
            onChange={(e) => {
              setinputPost(e.target.value);
            }}
            className="PostInput"
            placeholder="Start a post"
          />
          <button className="postButton" onClick={handlePost}>
            Post
          </button>
        </div>
        <div className="addPostFooters">
          <div className="addPostFooter" onClick={attachFile}>
            <InputFeedIcon Icon={PhotoSizeSelectLargeRounded} color="#70B5F9" />
            <p>Photo</p>
          </div>
          <div className="addPostFooter">
            <InputFeedIcon Icon={VideocamRounded} color="#B8DCA6" />
            <p>Video</p>
          </div>
          <div className="addPostFooter">
            <InputFeedIcon Icon={EventRounded} color="#E7A33E" />
            <p>Event</p>
          </div>
          <div className="addPostFooter">
            <InputFeedIcon Icon={AssignmentRounded} color="#F5987E" />
            <p>Write Article</p>
          </div>
        </div>
      </div>
      <hr className="feedHR" />
      <FlipMove>
        {posts.map(({ id, post }) => (
          <FeedPost
            key={id}
            id={id}
            name={post.Name}
            avatar={post.avatar}
            postText={post.postText}
            postMedia={post.media}
            likes={post.likes}
            timestamp={post.timestamp}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feeds;
