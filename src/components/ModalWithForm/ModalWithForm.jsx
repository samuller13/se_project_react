import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  alternativeAction,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`} onClick={onClose}>
      <div
        className="modal__content modal__content_form"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__footer-buttons">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
            {alternativeAction && (
              <button
                type="button"
                className="modal__alternative-link"
                onClick={alternativeAction.onClick}
              >
                {alternativeAction.text}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
