export default function ImagePopup(props) {
  const { card } = props;

  return (
    <>
      <div className="popup__image-wrapper">
        <button className="popup__close" type="button" onClick={props.onClose}>
          ×
        </button>
        <img className="popup__image" src={card.link} alt={card.name} />
      </div>
      <figcaption className="popup__caption">{card.name}</figcaption>
    </>
  );
}
