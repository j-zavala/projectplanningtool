import React, { useEffect, useState } from "react";
import "../App.css";
import Todo from "../Todo";
import axios from "axios";

export type TodoDTO = {
    id: number;
    title: string;
    description: string;
    done: boolean;
    createdAt?: Date;
};

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<TodoDTO[]>([]);
    const [newTodo, setNewTodo] = useState<TodoDTO>({
        id: 0,
        title: "",
        description: "",
        done: false,
    });

    useEffect(() => {
        axios.get("http://localhost:3005/todos")
            .then((response) => {
                console.log("Fetched todos:", response.data);
                setTodos(response.data);
            })
            .catch((error) => {
                console.error("Error fetching todos:", error);
                // Optionally, set an error state here to display to the user
            });
    }, []);

    const updateTodos = (updatedTodo: TodoDTO) => {
        console.log("Updating todo:", updatedTodo);
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        ));
    };

    const updateForm = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNewTodo({
            ...newTodo,
            [e.target.name]: e.target.value,
        });
    };

    const addTodo = () => {
        axios.post("http://localhost:3005/todos", newTodo)
            .then((response) => {
                console.log("Added todo, response:", response.data);
                setTodos(response.data);
                // Optionally, clear the newTodo state here
            })
            .catch((error) => {
                console.error("Error adding todo:", error);
                // Optionally, set an error state here to display to the user
            });
    };

    console.log("Current todos state:", todos);

    return (
        <div className="container">
            <div className="card">
                <h3>What needs to be done?</h3>
                <div className="form">
                    <input
                        type="text"
                        placeholder="Title"
                        onChange={updateForm}
                        name="title"
                    />
                    <textarea
                        placeholder="Description"
                        onChange={updateForm}
                        name="description"
                    />
                    <button onClick={addTodo}>Add</button>
                </div>
            </div>

            {Array.isArray(todos) ? (
                todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        updateTodos={(updatedTodo) => updateTodos(updatedTodo)}
                    />
                ))
            ) : (
                <p>No todos available or todos is not an array</p>
            )}
        </div>
    );
};

export default TodoPage;