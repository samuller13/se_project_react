import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../Hooks/useForm";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="add-item-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input modal__input_type_card-name"
          id="add-item-name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
          name="name"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input modal__input_type_url"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleChange}
          value={values.imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <div>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              name="weather"
              id="hot"
              type="radio"
              className="modal__radio-input"
              value="hot"
              onChange={handleChange}
              checked={values.weather === "hot"}
            />{" "}
            Hot
          </label>
        </div>

        <div>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              id="warm"
              type="radio"
              className="modal__radio-input"
              value="warm"
              onChange={handleChange}
              checked={values.weather === "warm"}
            />{" "}
            Warm
          </label>
        </div>

        <div>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              name="weather"
              id="cold"
              type="radio"
              className="modal__radio-input"
              value="cold"
              onChange={handleChange}
              checked={values.weather === "cold"}
            />{" "}
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
