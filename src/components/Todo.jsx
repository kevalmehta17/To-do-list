import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo } from "../features/todo/todoSlice";
import { useState } from "react";

function Todo() {
  const todos = useSelector((state) => state.todo.todos); // Access todos correctly
  const dispatch = useDispatch();

  // Local state for editing a todo
  const [editingTodo, setEditingTodo] = useState(null);
  const [newText, setNewText] = useState("");

  // Handle editing a todo
  const handleEditClick = (todo) => {
    setEditingTodo(todo); // Set the todo to be edited
    setNewText(todo.text); // Set the initial text in the input field
  };

  // Handle the save/update of the todo
  const handleUpdateClick = () => {
    if (newText.trim()) {
      dispatch(updateTodo({ id: editingTodo.id, text: newText }));
      setEditingTodo(null); // Clear the editing state
      setNewText(""); // Clear the input field
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto p-8 bg-gradient-to-r from-sky-500 to-sky-700 rounded-xl shadow-lg mt-8 border-4 border-sky-400 hover:scale-105 transform transition-all">
      <h2 className="text-3xl font-bold text-sky-100 mb-8 text-center">
        Todo List
      </h2>
      {todos.length === 0 ? (
        <p className="text-sky-100 text-center text-lg">
          No todos available. Add some tasks!
        </p>
      ) : (
        <ul className="space-y-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-sky-300 text-sky-700 p-4 rounded-xl shadow-sm hover:bg-sky-200 hover:shadow-lg transition-all"
            >
              {editingTodo?.id === todo.id ? (
                // Input field for editing the todo
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="p-2 rounded-md"
                  />
                  <button
                    onClick={handleUpdateClick}
                    className="px-4 py-2 text-sm bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span className="text-lg font-medium">{todo.text}</span>
              )}

              <div className="flex space-x-2">
                {editingTodo?.id === todo.id ? (
                  <button
                    onClick={() => setEditingTodo(null)} // Cancel editing
                    className="px-3 py-2 text-sm bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(todo)} // Start editing
                    className="px-3 py-2 text-xl bg-transparent text-blue-500 rounded-full hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  >
                    ✍️
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                )}

                <button
                  onClick={() => dispatch(removeTodo(todo.id))} // Correctly pass the id
                  className="px-3 py-2 text-xl bg-transparent text-red-500 rounded-full hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 transition"
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todo;
