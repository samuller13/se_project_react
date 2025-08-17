import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input modal__input_type_card-name"
          id="name"
          placeholder="Name"
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className="modal__input modal__input_type_url"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <div>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              name="button"
              id="hot"
              type="radio"
              className="modal__radio-input"
              value="hot"
              onChange={handleWeatherChange}
              checked={weather === "hot"}
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
              name="button"
              id="warm"
              type="radio"
              className="modal__radio-input"
              value="warm"
              onChange={handleWeatherChange}
              checked={weather === "warm"}
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
              name="button"
              id="cold"
              type="radio"
              className="modal__radio-input"
              value="cold"
              onChange={handleWeatherChange}
              checked={weather === "cold"}
            />{" "}
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
