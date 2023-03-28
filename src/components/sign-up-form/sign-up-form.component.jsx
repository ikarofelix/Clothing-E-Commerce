import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.util";
import { FormInput } from "../form-input/form-component";
import { Button } from "../button/button.component";

import "./sign-up-form.styles.scss";

// See if passwords matches
// Authenticate the user with that password
// Create a user document from what createAuthUserWithEmailAndPassword returns

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword || password.length < 6) {
      alert("Your password must match and have more than 6 characters");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (code.error === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.error(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up now</span>
      <form onSubmit={handleSubmit} action="/">
        <FormInput
          label="Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          autoComplete="username"
        />

        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          autoComplete="password"
          value={password}
        />

        <FormInput
          label="Confirm password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          autoComplete="confirmPassword"
          value={confirmPassword}
        />

        <Button buttonType="default" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
