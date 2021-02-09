import { Avatar } from "@material-ui/core";
import { BookmarkRounded } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import "./BodyLeft.css";
import { selectUser } from "./features/counterSlice";
function BodyLeft() {
  const user = useSelector(selectUser);
  return (
    <div className="BodyLeft">
      <div className="bodyLeftUpper">
        <img
          className="sideLeftImage"
          src="https://thumbs.dreamstime.com/b/curves-abstract-red-206532661.jpg"
          alt=""
        />
        <Avatar className="sideBarLogo" src={user?.AvatarPhoto} alt="" />
        <h4 className="SideBarName">{user?.Name}</h4>
        <p className="SideBarUniversityName">Student at U.I.E.T Kurukshetra</p>
        <div className="optionSideLeft">
          <h5 className="SideBarOption">Connections</h5>
          <p className="SideBarOptionDet">Grow your Network</p>
        </div>
        <div className="optionSideLeft">
          <h5 className="SideBarOption">Invitations</h5>
        </div>
        <div className="optionSideLeft2">
          <p className="SideBarOption">Access exclusive tools and insights</p>
          <h5 className="SideBarOptionDet2">Try Premium free for 1 month</h5>
        </div>
        <div className="optionSideLeft3">
          <BookmarkRounded className="bookmarkLogo" />
          <p className="SideBarOption">My items</p>
        </div>
      </div>
      <div className="BodyLeftLower">
        <h5 className="SideBarOptionDet3">Groups</h5>
        <h5 className="SideBarOptionDet3">Events</h5>
        <h5 className="SideBarOptionDet3"> Followed Hashtags</h5>
        <div className="optionSideLeft4">
          <h5 className="SideBarOption2">Discover More</h5>
        </div>
      </div>
    </div>
  );
}

export default BodyLeft;
