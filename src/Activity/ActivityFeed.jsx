import React, { Fragment,useState } from "react";
import ActivityFeedItem from "./ActivityFeedItem.jsx";

export default function ActivityList(props) {
  const [archiveData, setArchiveData] = useState();
  const [showAll, setShowAll] = useState(true)
  const [showArchived, setShowArchived] = useState(false)
  const [allActive, setAllActive] = useState('active')
  const [archiveActive, setArchiveActive] = useState('')
  const { data } = props;

  function clickShowAllHandler() {
    setShowAll(true);
    setShowArchived(false)
    setAllActive('active')
    setArchiveActive('')
  }
  function clickShowArchivedHandler() {
    setShowAll(false);
    setShowArchived(true)
    setArchiveActive('active')
    setAllActive('')
  }

  // filter empty calls from api
  let filteredActivitylist = data.filter((object) =>
    object.hasOwnProperty("from")
  );
  // sort by date descending (most recent at the top)
  let callList = filteredActivitylist.sort((a, b) => {
    let da = new Date(a.created_at);
    let db = new Date(b.created_at);
    return db - da;
  });
  // filter out all archived calls
  let archiveCalls = callList.filter((object)=> {return object.is_archived===true})
  // maps out the entire call list
  callList = filteredActivitylist.map((activity) => (
    <ActivityFeedItem
      key={activity.id}
      callType={activity.call_type}
      dateCreated={activity.created_at}
      direction={activity.direction}
      duration={activity.duration}
      from={activity.from}
      id={activity.id}
      archived={activity.is_archived}
      to={activity.to}
      via={activity.via}
    />
  ));
  // maps out the entire archived list
  let archivelList = archiveCalls.map((activity) => (
    <ActivityFeedItem
      key={activity.id}
      callType={activity.call_type}
      dateCreated={activity.created_at}
      direction={activity.direction}
      duration={activity.duration}
      from={activity.from}
      id={activity.id}
      archived={activity.is_archived}
      to={activity.to}
      via={activity.via}
    />
  ));




  return (
    <Fragment>
      <div className="callListHeader">
        <span className={`allCalls_${allActive}`} onClick={clickShowAllHandler}>All Calls</span>
        <span className={`archived_${archiveActive}`} onClick={clickShowArchivedHandler}>Archived</span>
      </div>
      <div>
        {props.created_at}
        <div className={`allCallList_${allActive}`}> {showAll && callList} </div>
        <div className={`archivedList_${archiveActive}`}> {showArchived && archivelList} </div>
      </div>
    </Fragment>
  );
}
