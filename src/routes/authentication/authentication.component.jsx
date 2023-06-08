//import { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sing-in-form/sign-in-form.component";

const Authentication = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <SignInForm />
      <h1>Sign Up Page</h1>
      <SignUpForm />
    </div>
  );
};

export default Authentication;
