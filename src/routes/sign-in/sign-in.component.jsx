//import { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGoogleRedirect,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  // redirect, so once na bumalik na sa signin pag mag run tong code nato
  // pero ung useEffect mag run lang everytime na mag visit sa signin page
  // kaya sa umpisa, null value sa dahilanan na wala namang redirect na nangyari
  /*useEffect(() => {
    const fetchData = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
      }
    };
    fetchData();
  }, []);

  <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
*/
  ////////
  ///////
  // destructure that is why user inside {}
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  /////
  ////
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
