import { Button } from "@material-ui/core";
import {
  ArrowDownward,
  ExpandMoreRounded,
  FiberManualRecordRounded,
  Info,
} from "@material-ui/icons";
import React from "react";
import "./BodyRight.css";
function BodyRight() {
  const newsArticle = (str1, str2, str3) => (
    <div className="news">
      <FiberManualRecordRounded className="fiberIcon" />
      <div className="newsdetails">
        <h4 className="newsTitle">{str1}</h4>
        <p className="newsTimestamp">
          {str2} <FiberManualRecordRounded className="fiberIcondetails" />{" "}
          {str3} readers
        </p>
      </div>
    </div>
  );
  return (
    <div className="bodyRight">
      <div className="linkedinnews">
        <div className="linkedinnewstitle">
          <h2 className="linkedinNews">LinkedIn News</h2>
          <Info className="linkedinnewsicon" />
        </div>
        {newsArticle("India's best business school", "3 hrs ago", "3333")}
        {newsArticle("Govt. allows 4 days work", "2 days ago", "52k")}
        {newsArticle("Massive NRI rush to buy homes", "1 hr ago", "3333")}
        {newsArticle("Tesla bets big on bitcoin", "4 hrs ago", "3000")}
        {newsArticle("New Policy beneficial for farmers", "5 days ago", "9855")}
        <button className="showmorebtn">
          Show More <ExpandMoreRounded />{" "}
        </button>
      </div>
    </div>
  );
}

export default BodyRight;
