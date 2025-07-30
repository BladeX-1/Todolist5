import axios from "axios";
import React, { useEffect, useState } from "react";
axios.defaults.withCredentials = true;

function Tasks() {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [getAllNewTasks, setGetAllNewTasks] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function handleAdd(e) {
        try {
            const result = await axios.post("http://localhost:3000/tasks", {
                body: newTodo,
                done: false,
            });
            console.log("task result", result);
            setGetAllNewTasks(true);
        } catch (err) {
            console.log("task error", err);
        }
    }

    useEffect(() => {
        if (getAllNewTasks) {
            (async () => {
                try {
                    const result = await axios.get(
                        "http://localhost:3000/tasks"
                    );
                    console.log(result);
                    setTodos(result.data);
                    setIsLoggedIn(true);
                } catch (err) {
                    if (err.response?.status == 400) {
                        setIsLoggedIn(false);
                    }
                    console.log(err);
                }
            })();
            setGetAllNewTasks(false);
        }
    }, [getAllNewTasks]);
    return (
        <>
            {isLoggedIn ? (
                <div>
                    <h1>Todos</h1>
                    <input
                        type="text"
                        placeholder="enter task"
                        onChange={(e) => setNewTodo(e.target.value)}
                    ></input>
                    <button onClick={handleAdd}>Add</button>
                    {todos.length > 0 ? (
                        <ul>
                            {todos.map((element) => (
                                <li>{element.body}</li>
                            ))}
                        </ul>
                    ) : (
                        <h3>List is empty</h3>
                    )}
                </div>
            ) : (
                <h2>Please log in to see the todos</h2>
            )}
        </>
    );
}

export default Tasks;
