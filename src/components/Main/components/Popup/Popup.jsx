import { useEffect } from "react";

export default function Popup(props) {
  const { onClose, title, children } = props;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains("popup")) {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div
        className={`popup__content ${
          !title ? "popup__content_content_image" : ""
        }`}
      >
        {title && (
          <button
            aria-label="Close modal"
            className="popup__close"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        )}

        {title && <h3 className="popup__title">{title}</h3>}

        {typeof children === "function" ? children({ onClose }) : children}
      </div>
    </div>
  );
}
