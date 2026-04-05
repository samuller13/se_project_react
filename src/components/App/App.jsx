import { useState, useEffect } from "react";

import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import {
  addItem,
  deleteItem,
  getItems,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { authorize, register, checkToken } from "../../utils/auth";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    register(name, avatar, email, password)
      .then(() => {
        closeActiveModal();
        return authorize(email, password);
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleSignIn = (email, password) => {
    authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Sign-in failed:", err);
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    addItem({ name, imageUrl, weather, _id: newId }, token)
      .then((data) => {
        closeActiveModal();
        setClothingItems([data, ...clothingItems]);
      })
      .catch(console.error);
  };

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
  };

  const handleCardDelete = (_id) => {
    const token = localStorage.getItem("jwt");
    const newClothingItems = clothingItems.filter((item) => item._id !== _id);
    deleteItem(_id, token)
      .then((_id) => {
        closeActiveModal();
        setClothingItems(newClothingItems);
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    updateProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Profile update failed: ", err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        data.sort((a, b) => b._id - a._id);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleKeyPress = (event) => {
      if (event.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [activeModal]);

  return (
    <BrowserRouter>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                handleModalOpen={handleModalOpen}
              />
              <Routes>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        onCardClick={handleCardClick}
                        onAddClick={handleAddClick}
                        clothingItems={clothingItems}
                        handleModalOpen={handleModalOpen}
                        onSignOut={handleSignOut}
                        onCardLike={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <Main
                      onCardLike={handleCardLike}
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  }
                />
              </Routes>

              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleCardDelete}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onSubmit={handleRegistration}
              onLogInClick={() => setActiveModal("login")}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onSubmit={handleSignIn}
              onSignUpClick={() => setActiveModal("register")}
            />
            <EditProfileModal
              isOpen={activeModal === "change profile data"}
              onClose={closeActiveModal}
              onSubmit={handleEditProfile}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
