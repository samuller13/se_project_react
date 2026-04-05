import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function LoginModal({
  onClose,
  isOpen,
  onSubmit,
  onSignUpClick,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpClick = () => {
    onClose();
    onSignUpClick();
  };

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(email, password);
  };

  return (
    <div className="login-modal">
      <ModalWithForm
        title="Log in"
        buttonText="Log in"
        alternativeAction={{
          text: "or Sign Up",
          onClick: handleSignUpClick,
        }}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="modal__label">
          Email
          <input
            id="email"
            className="modal__input modal__input_type_email"
            placeholder="Email"
            required
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label htmlFor="password" className="modal__label">
          Password
          <input
            id="password"
            className="modal__input modal__input_type_password"
            placeholder="Password"
            required
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
      </ModalWithForm>
    </div>
  );
}
