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
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input modal__input_type_email"
          id="register-email"
          placeholder="Email"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.email}
          name="email"
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          name="password"
          className="modal__input modal__input_type_password"
          id="register-password"
          placeholder="Password"
          required
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*{" "}
        <input
          type="text"
          className="modal__input modal__input_type_card-name"
          id="register-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleChange}
          value={values.name}
          name="name"
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          alt="User avatar"
          name="avatar"
          className="modal__input modal__input_type_url"
          id="register-avatar"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}
