import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../Hooks/useForm";

export default function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onLogInClick,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };
  const handleLogInClick = () => {
    onClose();
    onLogInClick();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      alternativeAction={{
        text: "or Log in",
        onClick: handleLogInClick,
      }}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input modal__input_type_email"
          id="email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.email}
          name="email"
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          name="password"
          className="modal__input modal__input_type_password"
          id="password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input modal__input_type_card-name"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
          name="name"
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input modal__input_type_url"
          id="avatar"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
