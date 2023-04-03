import { useState } from "react";
import FormInput from "../form-input/form-input-component";
import { SignInContainer, SubTitle, ButtonsContainer } from "./sign-in-form.styles.jsx";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [SignInFormFields, setSignInFormFields] = useState(defaultSignInFormFields);
  const { email, password } = SignInFormFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFormFields({ ...SignInFormFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 6) {
      alert("Your password must be longer than 6 characters");
      return;
    }
    try {
      const { user } = await signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("This user was not found in our database");
      }
      console.log(error);
    }
  };

  return (
    <SignInContainer>
      <SubTitle>I already have an account</SubTitle>
      <p>Sign in with your email and password</p>
      <form onSubmit={handleSubmit} action="/">
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
          value={password}
          autoComplete="password"
        />
        <ButtonsContainer>
          <Button buttonType={BUTTON_TYPE_CLASSES.inverted} type="submit">
            Sign In
          </Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} type="button">
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
