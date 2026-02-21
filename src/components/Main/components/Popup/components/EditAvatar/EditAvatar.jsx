export default function EditAvatar() {
  return (
    <form
      className="popup__form"
      name="edit-avatar-form"
      id="edit-avatar-form"
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="avatar-url"
          name="avatar-url"
          placeholder="URL da imagem"
          required
          type="url"
        />
        <span className="popup__error" id="avatar-url-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
