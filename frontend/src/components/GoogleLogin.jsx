import {GoogleAuthProvider,signInWithPopup} from "firebase/auth";
import {auth} from "../firebaseConfig"

function GoogleLogin(){
    const handleGoogleLogin=async ()=>{
        const provider = new GoogleAuthProvider();
        try{
            const result = await signInWithPopup(auth,provider);
            alert(result.user.displayName);
        }    catch(error){
                console.error(error);
            }
        
    }
    return(
        <button onClick={handleGoogleLogin}>Login with Google</button>
    )
}
export default GoogleLogin