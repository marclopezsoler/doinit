// UserDetails.js
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

function UserDetails() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      const fullName = data.name;
      const spaceIndex = fullName.indexOf(" ");
      const firstName =
        spaceIndex !== -1 ? fullName.substring(0, spaceIndex) : fullName;

      setName(firstName);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");

    fetchUserName();
  }, [user, loading]);

  return (<p style={{ display: 'inline' }}>{name}</p>);
}

export default UserDetails;
