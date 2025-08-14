import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  return (
    <div
      className={`modal ${activeModal === "preview" && "modal_opened"}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_image"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="modal__footer_content">
            <h2 className="modal__caption">{card.name} </h2>
            <button
              onClick={() => onDelete(card._id)}
              type="button"
              className="modal__delete"
            >
              Delete item
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
