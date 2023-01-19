import React from "react";
import keypad from "./icons/keypad-icon.svg";
import arrow from "./icons/back-arrow-icon.svg";
import setting from "./icons/setting-line-icon.svg";
import { NavLink, useNavigate } from "react-router-dom";

export default function NavBar() {
  let navigate = useNavigate();

  return (
    <div>
      <nav id="mobile-nav">
        <div>
          <img src={arrow} onClick= {()=>navigate('/')}/>
        </div>
        <div>
          <img src={keypad} />
          {/* for display only */}
        </div>
        <div>
          <img src={setting} />
          {/* for display only */}
        </div>
      </nav>
    </div>
  );
}
