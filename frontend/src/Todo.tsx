import { useState } from "react";
import { TodoDTO } from "./Pages/TodoPage";
import axios from "axios";
import { FaEdit, FaCheck } from "react-icons/fa";
import { toast } from 'react-toastify';
import { host } from "./constants";

type Props = {
    todo: TodoDTO;
    updateTodos: (updatedTodo: TodoDTO) => void;
};

const Todo = ({ todo, updateTodos }: Props) => {
    const [complete, setComplete] = useState(todo.done);
    const [newTitle, setNewTitle] = useState("");
    const [editTitle, setEditTitle] = useState(false);
    const [newDescription, setNewDescription] = useState("");
    const [editDescription, setEditDescription] = useState(false);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.target.value);
    };

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setNewDescription(e.target.value);
    };

    const editTodo = (key: string, value: string | boolean) => {
        const updatedTodo = { ...todo, [key]: value };
        axios
            .put(`http://${host}:3005/api/todos/${todo.id}`, {
                todo: updatedTodo,
            })
            .then((response) => {
                console.log("Updated todo, response:", response.data);
                updateTodos(response.data);
                toast.success('Todo updated successfully');
            })
            .catch((error) => {
                console.error("Error updating todo:", error);
                toast.error('Failed to update todo. Please try again.');
                if (key === 'title') setNewTitle(todo.title);
                if (key === 'description') setNewDescription(todo.description);
                if (key === 'done') setComplete(todo.done);
            });
    };

    return (
        <div
            key={todo.id}
            className={complete ? "complete card" : "incomplete card"}
        >
            <div className="todo-section">
                {editTitle ? (
                    <input
                        type="text"
                        placeholder={todo.title}
                        name="title"
                        onChange={handleTitleChange}
                    />
                ) : (
                    <h3>{todo.title}</h3>
                )}
                {editTitle ? (
                    <FaCheck
                        className="icon"
                        onClick={() => {
                            setEditTitle(false);
                            editTodo("title", newTitle);
                        }}
                    />
                ) : (
                    <FaEdit
                        className="icon"
                        onClick={() => {
                            setEditTitle(true);
                        }}
                    />
                )}
            </div>
            <div className="todo-section">
                {editDescription ? (
                    <textarea
                        placeholder={todo.description}
                        onChange={handleDescriptionChange}
                        name="description"
                    />
                ) : (
                    <div>{todo.description}</div>
                )}
                {editDescription ? (
                    <FaCheck
                        className="icon"
                        onClick={() => {
                            setEditDescription(false);
                            editTodo("description", newDescription);
                        }}
                    />
                ) : (
                    <FaEdit
                        className="icon"
                        onClick={() => {
                            setEditDescription(true);
                        }}
                    />
                )}
            </div>
            <button
                onClick={() => {
                    setComplete(!complete);
                    editTodo("done", !complete);
                }}
            >
                {complete ? "Mark Incomplete" : "Mark Complete"}
            </button>
        </div>
    );
};

export default Todo;