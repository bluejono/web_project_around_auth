import { useContext } from "react";
import pencilIcon from "../../assets/pencil.png";
import plusIcon from "../../assets/plus-compressed.png";
import userPic from "../../assets/user-pic.jpg";
import Card from "./components/Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditImage from "./components/Popup/components/EditImage/EditImage";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import NewCard from "./components/Popup/components/NewCard/NewCard";

export default function Main({ onOpenPopup }) {
  const { currentUser, handleCardLike, handleCardDelete, cards } =
    useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="user">
        <div className="user__pic-wrapper">
          <img
            className="user__pic"
            src={currentUser?.avatar || userPic}
            alt="User picture"
            onClick={() =>
              onOpenPopup({ title: "Editar Imagem", children: <EditImage /> })
            }
          />
        </div>

        <ul className="user__text">
          <li className="user__name">
            <p className="user__name-paragraph">
              {currentUser?.name || "Jacques Costeau"}
            </p>
            <button
              className="user__name-edit"
              onClick={() =>
                onOpenPopup({
                  title: "Editar Perfil",
                  children: <EditProfile />,
                })
              }
            >
              <img
                className="user__name-edit-image"
                src={pencilIcon}
                alt="pencil vector"
              />
            </button>
          </li>
          <li className="user__type">
            <p className="user__type-paragraph">
              {currentUser?.about || "Explorador"}
            </p>
          </li>
        </ul>
        <button
          className="user__add-button"
          onClick={() =>
            onOpenPopup({ title: "Novo Cartão", children: <NewCard /> })
          }
        >
          <img
            className="user__add-button-image"
            src={plusIcon}
            alt="Sinal de Mais branco"
          />
        </button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onOpenPopup={onOpenPopup}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
