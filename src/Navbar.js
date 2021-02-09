import { Avatar, Tooltip } from "@material-ui/core";
import {
  AppsRounded,
  BusinessCenterRounded,
  HouseRounded,
  Notifications,
  OndemandVideoRounded,
  SearchRounded,
  SupervisorAccountRounded,
  TextsmsRounded,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/counterSlice";
import { auth } from "./firebase";
import "./Navbar.css";
import NavBarIcons from "./NavBarIcons";
function Navbar() {
  const [inputSearch, setinputSearch] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    auth.signOut();
  };
  return (
    <div className="navbar">
      <div className="NavBarLeft">
        <img
          className="linkedinLogo"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAaVBMVEUAd7X///8AcLEEebb7/f4Debb9/v79/v8DeLY8l8Y7lsYAbbCcyuKlz+WQxN+Lwd0KfbiDvdvl8fcAc7O+3OwgiL6x1ehFnMlytNZqsNQZhLzF4O7w9/tSo81gqtGp0ebc7PUsjsJ8udngaOvIAAADg0lEQVRoge2abZeqIBCAGV7EjXItKjc1y/7/j7xD7m5AWHdD+uScs3s8kDzOIMwMDoGrSJ4lEC6H0ckVkUEiyeQPBC+ar+pjcqm+GsQMEAntUSuaQJQ+toZC8F+7U4KJBMKE6ltUwkAqJUgiEapCAJGwpSwVgxBGtyAJh4NKCVEH4AStRZNZC+1F0V5orgXN00FyukBzZekh2XsgbzFXCMIGSQlhTCsjegrMCEQQVXfF8rOrFYm3YxjCdFnw6zbdFkJHr6AgROjdGYAbATjXOlaXEISRcgN88GEZh3NJIuclBBF0BfzXr3EoYve1ACTXPViuOAO+izRYAMLUxVLEqBK7RQcggp48yHJ6SG5cjAWRsI/0A0FN9g6Ew2p6TZhae+a6pDDXwn67UKt++rcL3+Gts072sW4gDOn5L4VjRBa7rwT3LkarDMNvmeEf8EV0tDSyC9O++dZku4uPyEb8CdO6KrbNtvjQOt5rjXnGnGGkrKmibALfP+7jBQ6fs0lCvnHIn4Tlj2KBsTkJX4cGYgLH1yiD8n+A/LcgACevrHe7ujRXQYXCEFHaIsLNZjgMnMrjstm0nLebZnXodSi6Cbvfz3Zzk3Y97I/ozOxmE2Dkql5vnCS0OQbe+WAgoZbOjcUPpLBbeU0I7dprZi4xlZYyM8ENNP3d6h2DcPkj/Ab5vDVjkllrgg/DpfNA+HN59D3DKMTahW3ILbxoa3Ru/D75x59Uni6vQ3hZOL7N8j9+ePMqRMLmACNnGHce6FUItrcgA4ThCdwU9HUIjDLuVImAjB/4+EFnjCZXba6xv/SU8oLOOEhmvQgu5GRPShQER25Pl667nFrXeBmc7ZUSA8FxLyU1mSWtTw7Fm5S4ia/Ud5KsnVtM34dlrwiIxNkV31ZhhG1sXTh01sy/DkG7W55SqC9npcLXJBBvHEzPLFU4rCeBgBeHs7MDKaaA4A5ZWggvdXKzs5chGTSOn2XKTZlX02jiJnnGOU8O8ZO8u146CWTpQdYzZIbMkBkyQ2bIDJkhA+QmDsRqDkCs3tXTqH4FtiyDxx6BkMiW/ZO4K6eH/eom+27oy2nnNB+8DPfo9j5JgswBk/PVnj1sfnzTKMScPVpf7fMnzU97JzqDfCxvhMxfsf8Ake8pX3hLIUbqkhJtSkpSF8ccTXGMKSXqk5f5vKVg6Xpkkbz06j1FZJC6HO4fbRVnSvd35FUAAAAASUVORK5CYII="
          alt=""
        />
        <div className="search_header">
          <SearchRounded className="searchIcon" />
          <input
            value={inputSearch}
            onChange={(e) => setinputSearch(e.target.value)}
            className="searchBar"
            placeholder=" Search"
          />
        </div>
      </div>
      <div className="NavBarIcons">
        <NavBarIcons Icon={HouseRounded} text="Home" />
        <NavBarIcons Icon={SupervisorAccountRounded} text="My Network" />
        <NavBarIcons Icon={BusinessCenterRounded} text="Jobs" />
        <NavBarIcons Icon={TextsmsRounded} text="Messaging" />
        <NavBarIcons Icon={Notifications} text="Notifications" />
        <div className="avatarNav">
          <Tooltip title="Log Out">
            <Avatar
              onClick={handleLogout}
              className="Logoavatar"
              src={user?.AvatarPhoto}
              alt=""
            />
          </Tooltip>
          <p className="avatarNavText">Me</p>
        </div>
        <NavBarIcons Icon={AppsRounded} text="Work" />
        <NavBarIcons Icon={OndemandVideoRounded} text="Learning" />
      </div>
    </div>
  );
}

export default Navbar;
