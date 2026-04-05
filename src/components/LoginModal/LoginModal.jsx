import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import useForm from "../../Hooks/useForm";

export default function LoginModal({
  onClose,
  isOpen,
  onSubmit,
  onSignUpClick,
}) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSignUpClick = () => {
    onClose();
    onSignUpClick();
  };

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(values.email, values.password);
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
        <label htmlFor="login-email" className="modal__label">
          Email
          <input
            id="login-email"
            className="modal__input modal__input_type_email"
            placeholder="Email"
            required
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="login-password" className="modal__label">
          Password
          <input
            id="login-password"
            className="modal__input modal__input_type_password"
            placeholder="Password"
            required
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
          />
        </label>
      </ModalWithForm>
    </div>
  );
}
