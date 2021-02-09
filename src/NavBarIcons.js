import React from "react";
import "./NavBarIcons.css";
function NavBarIcons({ Icon, text }) {
  return (
    <div className="navicon">
      <Icon className="naviconIcon" />
      <p className="naviconText">{text}</p>
    </div>
  );
}

export default NavBarIcons;
