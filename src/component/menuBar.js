import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

const MenuBar = () => {
  const { user, logout } = useContext(AuthContext);
  const pathName = window.location.pathname;
  const path = pathName === "/" ? "Home" : pathName.substr(1);
  const [state, setState] = useState(path);
  const handleItemClick = (e, { name }) => setState(name);
  return (
    <Menu pointing secondary size="massive" color="teal">
      {!user ? (
        <>
          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={state === "login"}
              onClick={handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name="register"
              active={state === "register"}
              onClick={handleItemClick}
              as={Link}
              to="/register"
            />
          </Menu.Menu>
        </>
      ) : (
        <>
          <Menu.Item name={user.username} active as={Link} to="/" />
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={state === "logout"}
              onClick={logout}
            />
          </Menu.Menu>
        </>
      )}
    </Menu>
  );
};

export default MenuBar;
