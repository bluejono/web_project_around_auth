function InfoTooltip({ isOpen, onClose, isSuccess }) {
  if (!isOpen) return null;

  return (
    <div className="tooltip" onClick={onClose}>
      <div className="tooltip__content" onClick={(e) => e.stopPropagation()}>
        <button className="tooltip__close" type="button" onClick={onClose}>
          ✕
        </button>

        {isSuccess ? (
          <img
            className="tooltip__icon"
            src="../src/assets/accept.png"
            alt="Sucesso"
          />
        ) : (
          <img
            className="tooltip__icon"
            src="../src/assets/deny.png"
            alt="Erro"
          />
        )}

        <p className="tooltip__message">
          {isSuccess
            ? "Ótimo! Você se registrou com sucesso. Por favor, volte para fazer login."
            : "Algo deu errado! Tente novamente."}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
