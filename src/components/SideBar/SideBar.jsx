import { useContext } from "react";
import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleModalOpen, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  const getFirstLetter = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };
  if (!currentUser) {
    return null;
  }

  return (
    <div className="sidebar">
      <div className="sidebar__user_container">
        <p className="sidebar__username">{currentUser.name}</p>
        {currentUser.avatar ? (
          <img
            src={currentUser.avatar}
            alt="User avatar"
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {getFirstLetter(currentUser.name)}
          </div>
        )}
      </div>
      <button
        onClick={() => handleModalOpen("change profile data")}
        className="sidebar__edit_profile-btn"
      >
        Change profile data
      </button>

      <button onClick={onSignOut} className="sidebar__logout-btn">
        Log out
      </button>
    </div>
  );
}

export default SideBar;
