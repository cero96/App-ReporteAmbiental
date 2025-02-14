import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

function GoogleLogin() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      localStorage.setItem("token", result.user.accessToken);

      navigate("/home");

      if (window.opener) {
        window.close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      className="btn btn-link btn-floating mx-1"
      onClick={handleGoogleLogin}
    >
      <i className="fab fa-google"></i>
    </button>
  );
}

export default GoogleLogin;
