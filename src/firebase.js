import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyD8kL17igbt9ZzghIFrTCeF_J1AUugzxyg",
   authDomain: "to-do-app-a517f.firebaseapp.com",
   projectId: "to-do-app-a517f",
   storageBucket: "to-do-app-a517f.appspot.com",
   messagingSenderId: "616433025369",
   appId: "1:616433025369:web:92f95de81f27138f550c48",
   measurementId: "G-Q2GSJHSN81"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);
 const googleProvider = new GoogleAuthProvider();
 const signInWithGoogle = async () => {
   try {
     const res = await signInWithPopup(auth, googleProvider);
     const user = res.user;
     const q = query(collection(db, "users"), where("uid", "==", user.uid));
     const docs = await getDocs(q);
     if (docs.docs.length === 0) {
       await addDoc(collection(db, "users"), {
         uid: user.uid,
         name: user.displayName,
         authProvider: "google",
         email: user.email,
       });
     }
   } catch (err) {
     console.error(err);
     alert(err.message);
   }
 };

 const logInWithEmailAndPassword = async (email, password) => {
   try {
     await signInWithEmailAndPassword(auth, email, password);
   } catch (err) {
     console.error(err);
    //  alert(err.message);
   }
 };
 const registerWithEmailAndPassword = async (name, email, password) => {
   try {
     const res = await createUserWithEmailAndPassword(auth, email, password);
     const user = res.user;
     await addDoc(collection(db, "users"), {
       uid: user.uid,
       name,
       authProvider: "local",
       email,
     });
   } catch (err) {
     console.error(err);
    //  alert('Please, complete al fields with the correct information.');
   }
 };
 const sendPasswordReset = async (email) => {
   try {
     await sendPasswordResetEmail(auth, email);
     return { success: true, message: "Password reset link sent!" };
   } catch (err) {
     console.error(err);
     return { success: false, message: "The email you entered is not inside our database" };
   }
 };
 const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while logging out");
    });
};

 export {
   auth,
   db,
   signInWithGoogle,
   logInWithEmailAndPassword,
   registerWithEmailAndPassword,
   sendPasswordReset,
   logout,
 };