import React from "react";
import "./Body.css";
import BodyLeft from "./BodyLeft";
import Feeds from "./Feeds";
import BodyRight from "./BodyRight";
function Body() {
  return (
    <div className="body">
      <BodyLeft />
      <Feeds />
      <BodyRight />
    </div>
  );
}

export default Body;
