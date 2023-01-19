import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  findCallType,
  formatMinutes,
  formatNumber,
  formatCallTime,
} from "../helperFunctions/Functions";

export default function ActivityFeedItem(props) {
  if (props === undefined) {
    return <Fragment>Still loading...</Fragment>;
  }
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  const dateObj = new Date(props.dateCreated);
  const day = dateObj.toLocaleDateString();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  return (
    <div className="callItem">
      <div className="callDate">{day}</div>
      <div className="callTime">
        {hour}:{formatMinutes(minute)}
      </div>
      <div className="callIcon">{findCallType(props.callType)}</div>
      <div
        className="callMain"
        onClick={() => {
          setShowDetails(!showDetails);
        }}
      >
        <div>{props.archived}</div>
        <div className="callDetails">
          <div className="direction">{props.direction} Call</div>
          <div className="fromOrTo">
            {" "}
            {formatNumber(props.direction, props)}
          </div>
          {showDetails && (
            <Fragment>
              <div className="extraDetails">
                <div>{formatCallTime(props.duration)}</div>
                <div>
                  <div>From: {props.from}</div>
                </div>
                <div>Via: {props.via}</div>
              </div>
              <button
                onClick={() => navigate(`/${props.id}`)}
                className="infoButton"
              >
                <i>i</i>
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
