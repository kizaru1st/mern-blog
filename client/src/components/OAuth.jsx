import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { SignInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch(); 
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log("before res");
      const response = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: resultsFromGoogle.user.accessToken,
          email: resultsFromGoogle.user.email,
          googlePhotoURL: resultsFromGoogle.user.photoURL,
          name: resultsFromGoogle.user.displayName
        }),
      })
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error during Google sign-in:', errorData);
        return;
      }
      const data = await response.json();
      if (response.ok) {
        dispatch(SignInSuccess(data));
        window.location.href = "/";
      }

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Button
      type="button"
      gradientDuoTone={"pinkToOrange"}
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
