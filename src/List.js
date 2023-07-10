import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import "./List.css";
import UserDetails from "./UserDetails";
import trash from "./assets/trash.svg";
import Loader from "./components/Loader";
import { auth, db } from "./firebase";

function List() {
  const [text, setText] = useState("");
  const [toDoList, setToDoList] = useState(null);
  const [activeButton, setActiveButton] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});
  const [filteredToDoList, setFilteredToDoList] = useState(null);

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const changeText = (event) => {
    setText(event.target.value);
  };

  async function addElement() {
    if (text !== "") {
      try {
        const currentDate = new Date().toISOString(); // Get the current date and time
        const docRef = await addDoc(collection(db, "todos"), {
          name: text,
          checked: false,
          userId: user.uid, // Set the userId field to the current user's ID
          createdAt: currentDate, // Add the current date and time as the "createdAt" field
        });
        console.log("Document written with ID: ", docRef.id);
  
        // Fetch user-specific items again after adding a new item
        await fetchUserItems();
      } catch (e) {
        console.error("Error adding document: ", e);
        alert("An error occurred while adding the item: " + e.message);
      }
  
      setText("");
      if (activeButton !== 1) {
        handleButtonClick(1);
      }
    }
  }
  

  const deleteElement = async (itemId) => {
    try {
      await deleteDoc(doc(db, "todos", itemId));

      setToDoList((oldValues) => {
        const newList = oldValues.filter((item) => item.id !== itemId);
        return newList;
      });

      setFilteredToDoList((oldValues) => {
        const newList = oldValues.filter((item) => item.id !== itemId);
        return newList;
      });
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting the item");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addElement();
    }
  };

  const deleteAllElements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const batch = writeBatch(db);
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      setToDoList([]);
      setCheckedItems({});
      setFilteredToDoList([]);
      setActiveButton(1);
    } catch (err) {
      console.error(err);
      alert("An error occurred while deleting all items");
    }
  };

  const handleButtonClick = (buttonNumber) => {
    if (buttonNumber === activeButton) {
      return;
    }

    setActiveButton(buttonNumber);

    if (buttonNumber === 1) {
      setFilteredToDoList(toDoList);
    } else if (buttonNumber === 2) {
      const pendingList = toDoList.filter((item) => !checkedItems[item.id]);
      setFilteredToDoList(pendingList);
    } else if (buttonNumber === 3) {
      const completedList = toDoList.filter((item) => checkedItems[item.id]);
      setFilteredToDoList(completedList);
    }
  };

  const handleCheckboxChange = async (event, itemId) => {
    const checked = event.target.checked;

    try {
      await updateDoc(doc(db, "todos", itemId), {
        checked: checked.toString(),
      });

      setToDoList((prevList) =>
        prevList.map((item) =>
          item.id === itemId ? { ...item, checked: checked } : item
        )
      );

      setFilteredToDoList((prevList) =>
        prevList.map((item) =>
          item.id === itemId ? { ...item, checked: checked } : item
        )
      );

      setCheckedItems((prevItems) => ({
        ...prevItems,
        [itemId]: checked,
      }));
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the checkbox state");
    }
  };

  const fetchUserItems = async () => {
    try {
      const q = query(
        collection(db, "todos"),
        where("userId", "==", user.uid),
        // orderBy("createdAt", "desc"),
      );
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        checked: doc.data().checked === "true",
      }));
    
      setToDoList(items);
      setFilteredToDoList(items);
  
      const updatedCheckedItems = {};
      items.forEach((item) => {
        updatedCheckedItems[item.id] = item.checked;
      });
      setCheckedItems(updatedCheckedItems);
    } catch (err) {
      alert("An error occurred while fetching the items");
    }
  };
  
  
  useEffect(() => {
    if (loading) {
      setToDoList(null);
      setFilteredToDoList(null);
    } else if (!user) {
      navigate("/");
    } else {
      fetchUserItems();
    }
  }, [user, loading]);

  useEffect(() => {
    if (toDoList && toDoList.length > 0) {
      handleButtonClick(activeButton);
    }
  }, [toDoList, activeButton]);  

  return (
    <motion.div
      className="container text-center  bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Helmet>
        <title>doin' it - dashboard</title>
      </Helmet>
      {loading || toDoList === null ? (
        <Loader />
      ) : (
        <>
          <div className="list-app">
            <div>
              <h2 className="welcome-name">
                Hi <UserDetails />!
              </h2>
            </div>
            <div className="text-row">
              <input
                className="input"
                id="input"
                placeholder="Add a new task"
                value={text}
                onChange={changeText}
                onKeyPress={handleKeyPress}
              />
              <button className="button" onClick={addElement}>
                ADD
              </button>
            </div>
            {toDoList.length > 0 ? (
              <div className="buttons">
                <button
                  className={`button2 ${activeButton === 1 ? "active" : ""}`}
                  onClick={() => handleButtonClick(1)}
                >
                  Show all
                </button>
                <button
                  className={`button2 ${activeButton === 2 ? "active" : ""}`}
                  onClick={() => handleButtonClick(2)}
                >
                  Pending
                </button>
                <button
                  className={`button2 ${activeButton === 3 ? "active" : ""}`}
                  onClick={() => handleButtonClick(3)}
                >
                  Completed
                </button>
                <button className="button3" onClick={deleteAllElements}>
                  Clear
                </button>
              </div>
            ) : (
              <></>
            )}
            <div className="list">
              {filteredToDoList.length > 0 ? (
                <></>
              ) : (
                <div>
                  <p>You currently have no tasks here, start working hard!</p>
                </div>
              )}
              {filteredToDoList.map((item, index) => (
                <div className="element" key={item.id}>
                  <div className="check">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="checkbox"
                      id={`checkbox-${item.id}`}
                      value={item.name}
                      checked={checkedItems[item.id] || false}
                      onChange={(event) => handleCheckboxChange(event, item.id)}
                    />

                    <label
                      htmlFor={`checkbox-${item.id}`}
                      className={`item ${checkedItems[item.id] ? "done" : ""}`}
                    >
                      {item.name}
                    </label>
                  </div>
                  <a
                    onClick={() => deleteElement(item.id)}
                    className="image-trash-parent"
                  >
                    <img src={trash} className="image-trash"></img>
                  </a>
                </div>
              ))}
              {filteredToDoList.length > 0 ? (
                <div className="element2"></div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default List;
