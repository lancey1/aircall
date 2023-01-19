import React, { useEffect, useState, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  findCallType,
  formatMinutes,
  formatCallTime,
} from "../helperFunctions/Functions";
import regeneratorRuntime from "regenerator-runtime";
import Loading from "../Loading.jsx";
import { useNavigate, useParams } from "react-router-dom";

export default function CallItem() {
  let navigate = useNavigate();
  const [isLoading, setLoading] = useState();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [callData, setCallData] = useState();
  const URL =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities";

  const fetchCall = () => {
    fetch(`${URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setCallData(data));
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchCall();
  }, []);

  if (isLoading || !callData) {
    return <Loading />;
  }
  const archiveHandler = async (event) => {
    try {
      let response = await fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          is_archived: true,
        }),
      });
      console.log("archived");
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setError(error.message);
    }
    navigate('/')
  };
  const unarchiveHandler = async (event) => {
    try {
      let response = await fetch(`${URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          is_archived: false,
        }),
      });
      console.log("unarchived");
      let responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
    } catch (error) {
      setError(error.message);
    }
    navigate('/')
  };

  const dateObj = new Date(callData.created_at);
  const day = dateObj.toLocaleDateString();
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  return (
    <div className="detailedCall">
      <div>{findCallType(callData.call_type)}</div>
      <div className="callDate">{day} </div>
      <div>
        @ {hour}:{formatMinutes(minute)}
      </div>
      <div className="direction">{callData.direction} Call</div>
      <div>From:{callData.from}</div>
      <div>To:{callData.to}</div>
      <div>{formatCallTime(callData.duration)}</div>
      {!callData.is_archived ? (
        <button className="archiveButton" onClick={archiveHandler}>
          Archive Call
        </button>
      ) : (
        <button className="unarchiveButton" onClick={unarchiveHandler}>
          Unarchive Call
        </button>
      )}
    </div>
  );
}
