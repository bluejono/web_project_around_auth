import { useContext } from "react";
import trashIcon from "../../../../assets/trash.png";
import heartIcon from "../../../../assets/heart.png";
import filledHeartIcon from "../../../../assets/filled-heart.png";
import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { card, onOpenPopup, onCardLike, onCardDelete } = props;
  const { currentUser } = useContext(CurrentUserContext);
  const { name, link } = card;

  const isLiked =
    card.isLiked ||
    (currentUser?.likes && currentUser.likes.includes(card._id));

  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like-button_is-active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() =>
          onOpenPopup({
            title: "",
            children: ({ onClose }) => (
              <ImagePopup card={card} onClose={onClose} />
            ),
          })
        }
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      >
        <img
          className="card__delete-button-icon"
          src={trashIcon}
          alt="trash Icon"
        />
      </button>
      <div className="card__text">
        <p className="card__text-paragraph">{name}</p>
        <button className={cardLikeButtonClassName} onClick={handleLikeClick}>
          <img
            className="card__like-image"
            src={isLiked ? filledHeartIcon : heartIcon}
            alt="botão de like na foto"
            style={{
              width: "19px",
              height: "17px",
              verticalAlign: "middle",
              marginBottom: "2px",
            }}
          />
        </button>
      </div>
    </li>
  );
}
