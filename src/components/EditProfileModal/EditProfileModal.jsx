import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useContext } from "react";
import useForm from "../../Hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });
  const currentUser = useContext(CurrentUserContext);
  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name *
        <input
          id="edit-name"
          name="name"
          className="modal__input modal__input_type_card-name"
          placeholder=""
          required
          type="text"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar *
        <input
          id="edit-avatar"
          name="avatar"
          className="modal__input modal__input_type_url"
          placeholder=""
          required
          type="url"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
