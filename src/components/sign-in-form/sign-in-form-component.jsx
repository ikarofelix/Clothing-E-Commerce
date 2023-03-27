import { useState } from "react";
import { FormInput } from "../form-input/form-component";
import "./sign-in-form.styles.scss";
import { Button } from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.util";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const [SignInFormFields, setSignInFormFields] = useState(defaultSignInFormFields);
  const { email, password } = SignInFormFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignInFormFields({ ...SignInFormFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      alert("Your password must be longer than 6 characters");
      return;
    }
    try {
      await signInUserWithEmailAndPassword(email, password);
    } catch (error) {
      if ((error.code = "auth/user-not-found")) {
        alert("This user was not found in our database");
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>I already have an account</h2>
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
        />
        <div className="buttons-container">
          <Button buttonType="inverted" type="submit">
            Sign In
          </Button>
          <Button buttonType="google" onClick={signInWithGoogle} type="button">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
