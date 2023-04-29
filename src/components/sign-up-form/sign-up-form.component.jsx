import { useState } from "react";

import FormInput from "../form-input/form-input-component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignUpContainer, SubTitle } from "./sign-up-form.styles.jsx";
import { useDispatch } from "react-redux";

import { signUpStart } from "../../store/user/user.action";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const dispatch = useDispatch();
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
      dispatch(signUpStart(email, password, displayName));
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
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
    <SignUpContainer>
      <SubTitle>Don't have an account?</SubTitle>
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

        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Sign Up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
