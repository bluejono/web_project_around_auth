import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function AddPlacePopup() {
  const userContext = useContext(CurrentUserContext);
  const { handleAddCard } = userContext;

  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  const handleNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleLinkChange = (event) => {
    setCardLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddCard({ name: cardName, link: cardLink });
  };

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="card-name"
          maxLength="30"
          minLength="1"
          name="card-name"
          placeholder="Título"
          required
          type="text"
          value={cardName}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="card-name-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="card-link"
          name="link"
          placeholder="Link da imagem"
          required
          type="url"
          value={cardLink}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="card-link-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
