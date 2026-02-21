import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditImage() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateAvatar } = userContext;

  const avatarRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const avatarValue = avatarRef.current.value;
    handleUpdateAvatar({ avatar: avatarValue });
  };

  return (
    <form
      className="popup__form"
      name="edit-image-form"
      id="edit-image-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="image-link"
          name="image-link"
          placeholder="Novo link da imagem"
          required
          type="url"
          ref={avatarRef}
          defaultValue={currentUser?.avatar || ""}
        />
        <span className="popup__error" id="image-link-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
