import { Link } from "react-router-dom";
import { useContext } from "react";

import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, handleModalOpen }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {currentUser && (
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      )}

      {currentUser ? (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img src={currentUser.avatar} className="header__avatar" />
            ) : (
              <div className="header__avatar-placeholder">
                {getFirstLetter(currentUser.name)}
              </div>
            )}
          </div>
        </Link>
      ) : (
        <div className="header__auth-section">
          <button
            onClick={() => handleModalOpen("register")}
            className="header__register-btn"
          >
            Sign Up
          </button>

          <button
            onClick={() => handleModalOpen("login")}
            className="header__login-btn"
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
