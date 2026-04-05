import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useState } from "react";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  if (!card || !card._id) {
    return null;
  }

  const handleDeleteConfirm = () => {
    onDelete(card._id);
    setShowDeleteConfirm(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
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
              {currentUser?._id === card.owner && (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  type="button"
                  className="modal__delete"
                >
                  Delete item
                </button>
              )}
            </div>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="modal modal_opened" onClick={handleDeleteCancel}>
          <div
            className="modal__content modal__content_type_confirmation"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={onClose}
              type="button"
              className="modal__close"
            ></button>
            <p className="modal__confirmation-text">
              Are you sure you want to delete this item?
            </p>
            <p className="modal__confirmation-text">
              This action is irreversible.
            </p>
            <div className="modal__confirmation-buttons">
              <button
                onClick={handleDeleteConfirm}
                className="modal__button modal__button_type_confirm"
              >
                Yes, delete item
              </button>
              <button
                onClick={handleDeleteCancel}
                className="modal__button modal__button_type_cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ItemModal;
