import { useState, useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { auth } from "./firebase";

function UserDetails() {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getFirestore();
        const userDocRef = doc(collection(db, "users"), auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        console.log("User Doc Snapshot:", userDocSnapshot.exists());

        if (userDocSnapshot.exists()) {
          console.log("User Document Data:", userDocSnapshot.data());
          const userData = userDocSnapshot.data();
          setDisplayName(userData.name);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch user data whenever auth.currentUser changes
    if (auth.currentUser) {
      fetchUserData();
    }
  }, [auth.currentUser]); // Add auth.currentUser as a dependency

  return <>{displayName}</>;
}

export default UserDetails;
