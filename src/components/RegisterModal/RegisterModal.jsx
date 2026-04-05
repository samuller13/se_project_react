import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const RegisterModal = ({ isOpen, onClose, onSubmit, onLogInClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email: email, password: password, name: name, avatar: avatar });
  };
  const handleLogInClick = () => {
    onClose();
    onLogInClick();
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setAvatar("");
  }, [isOpen]);

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
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
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
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          name="link"
          className="modal__input modal__input_type_url"
          id="avatar"
          placeholder="Avatar URL"
          required
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
