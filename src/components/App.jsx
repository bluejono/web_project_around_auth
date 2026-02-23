import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Popup from "./Main/components/Popup/Popup.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import { register, authorize, checkToken } from "../utils/auth.js";

function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [redirectToSignin, setRedirectToSignin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          const email = data.data ? data.data.email : data.email;
          setIsLoggedIn(true);
          setUserEmail(email || "");

          return Promise.all([api.getUserInfo(), api.getInitialCards()]);
        })
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(Array.isArray(cardsData) ? cardsData : []);
        })
        .catch((error) => {
          console.error("Token inválido:", error);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  function handleLogin({ email, password }) {
    authorize(email, password)
      .then((data) => {
        const token = data.token;
        if (token) {
          localStorage.setItem("jwt", token);
          setIsLoggedIn(true);
          setUserEmail(email);
          return Promise.all([api.getUserInfo(), api.getInitialCards()]);
        }
      })
      .then((results) => {
        if (results) {
          const [userData, cardsData] = results;
          setCurrentUser(userData);
          setCards(Array.isArray(cardsData) ? cardsData : []);
        }
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error);
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  function handleRegister({ email, password }) {
    register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsTooltipOpen(true);
      })
      .catch((error) => {
        console.error("Erro ao registrar:", error);
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  function handleTooltipClose() {
    setIsTooltipOpen(false);
    if (isSuccess) {
      setRedirectToSignin(true);
    }
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserEmail("");
    setCurrentUser(null);
  }

  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        setPopup(null);
      })
      .catch((error) => {
        console.error("Erro ao atualizar usuário:", error);
      });
  };

  const handleUpdateAvatar = (data) => {
    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        setPopup(null);
      })
      .catch((error) => {
        console.error("Erro ao atualizar avatar:", error);
      });
  };

  const handleCardLike = (card) => {
    const isLiked =
      card.isLiked ||
      (currentUser?.likes && currentUser.likes.includes(card._id));

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  };

  const handleAddCard = (card) => {
    api
      .addCard(card.name, card.link)
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        setPopup(null);
      })
      .catch((error) => {
        console.error("Erro ao adicionar card:", error);
      });
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleCardLike,
        handleCardDelete,
        handleAddCard,
        cards,
      }}
    >
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <div className="page">
                  <div className="overlay"></div>
                  <Header
                    logo="../src/assets/svg-logo.svg"
                    isLoggedIn={isLoggedIn}
                    userEmail={userEmail}
                    onLogout={handleLogout}
                    currentPage="main"
                  />
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                  />
                  <Footer />
                  {popup && (
                    <Popup onClose={handleClosePopup} title={popup.title}>
                      {popup.children}
                    </Popup>
                  )}
                </div>
              </ProtectedRoute>
            }
          />


          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Register onRegister={handleRegister} />
                  <InfoTooltip
                    isOpen={isTooltipOpen}
                    onClose={handleTooltipClose}
                    isSuccess={isSuccess}
                  />
                  {redirectToSignin && <Navigate to="/signin" replace />}
                </>
              )
            }
          />


          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <>
                  <Login onLogin={handleLogin} />
                  <InfoTooltip
                    isOpen={isTooltipOpen}
                    onClose={handleTooltipClose}
                    isSuccess={isSuccess}
                  />
                </>
              )
            }
          />


          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
