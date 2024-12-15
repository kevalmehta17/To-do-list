import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState(""); // Correctly initialize state
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    if (input.trim() === "") return; // Prevent empty todos

    dispatch(addTodo(input)); // Dispatch action with input value
    setInput(""); // Clear the input field
  };

  return (
    <div className="max-w-lg w-full mx-auto p-8 bg-gradient-to-r from-sky-500 to-sky-700 rounded-xl shadow-lg border-4 border-sky-400 hover:scale-105 transform transition-all">
      <h2 className="text-3xl font-bold text-sky-100 mb-6 text-center ">
        Add Todo
      </h2>
      <form onSubmit={addTodoHandler} className="space-y-6">
        <div>
          <label
            htmlFor="todoTitle"
            className="block text-lg font-semibold text-sky-100"
          >
            Todo:
          </label>
          <input
            type="text"
            id="todoTitle"
            name="todoTitle"
            placeholder="Enter your task"
            required
            value={input} // Bind input state
            onChange={(e) => setInput(e.target.value)} // Update state on change
            className="w-full mt-2 p-3 border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-sky-200 text-sky-800 placeholder:text-sky-800 transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-3 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 transition"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
