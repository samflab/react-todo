import React from "react";
import "./App.css";
import { useState } from "react";
import { auth, firestore } from "./firebase";
import firebase from "firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsCircle } from "react-icons/bs";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const Todos = () => {
  const [todo, setTodo] = useState("");
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const [todos] = useCollectionData(todosRef, { idField: "id" });
  const signOut = () => auth.signOut();

  const onSubmitTodo = (event) => {
    event.preventDefault();

    setTodo("");
    todosRef.add({
      text: todo,
      complete: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  return (
    <div className="body">
      <header>
        <h2>TODO</h2>
        <button style={{ color: "white" }} onClick={signOut}>
          Sign Out
        </button>
      </header>
      <main className="main">
        <form onSubmit={onSubmitTodo}>
          {/* <div className="input-container">
          <i className="far fa-circle icon"></i> */}
          <input
            required
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Create a new todo.."
          />
          {/* </div> */}
          {/* <button type="submit">Add</button> */}
        </form>
        <div className="todo-list">
          {todos && todos.map((todo) => <Todo key={todo.id} {...todo} />)}
        </div>
        
      </main>
    </div>
  );
};

const Todo = ({ id, complete, text }) => {
  const todosRef = firestore.collection(`users/${auth.currentUser.uid}/todos`);
  const onCompleteTodo = (id, complete) =>
    todosRef.doc(id).set({ complete: !complete }, { merge: true });
  const onDeleteTodo = (id) => todosRef.doc(id).delete();

  return (
    <div key={id} className="one-entry">
      <button
        className={`todo-item ${complete ? "check" : ""}`}
        tabIndex="0"
        onClick={() => onCompleteTodo(id, complete)}
      >
        {complete ? <AiOutlineCheckCircle /> : <BsCircle />}
      </button>

      <div className={`todo-item-list ${complete ? "complete" : ""}`}>
        {text}
      </div>
      <div className="cross-button">
        <button onClick={() => onDeleteTodo(id)}>
          <AiOutlineCloseCircle />
        </button>
      </div>
     
    </div>
    
  );
};

export default Todos;
