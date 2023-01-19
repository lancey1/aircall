import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header.jsx";
import regeneratorRuntime from "regenerator-runtime";
import { Fragment, useEffect, useState } from "react";
import ActivityFeed from "./Activity/ActivityFeed.jsx";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import CallItem from "./Activity/CallItem.jsx";
import NavBar from "./NavBar.jsx";

const App = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const URL =
    "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities";

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(URL);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [data]);

  if (data === undefined) {
    return (<Fragment>Still loading...</Fragment>);
  }

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<ActivityFeed data={data} />} />
        <Route path="/:id" element={<CallItem />} />
      </Routes>
      <NavBar/>
    </div>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);

export default App;
