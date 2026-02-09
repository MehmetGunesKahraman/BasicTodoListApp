import { useState, useEffect } from "react";
// Reusable todo item UI component
import TodoItem from "../Components/TodoItem";
// Factory helper to build a new todo object
import { createTodo } from "../Interfaces/todo";

function Home() {
  // Initialize todos from localStorage (runs once on mount)
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (error) {
        console.error("Failed to load todos from localStorage:", error);
        return [];
      }
    }
    return [];
  });
  // Input field state
  const [text, setText] = useState("");
  // Popup state for add feedback
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Persist todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Auto-hide popup after a short delay
  useEffect(() => {
    if (!isPopupVisible) return;
    const timer = setTimeout(() => setIsPopupVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [isPopupVisible]);

  // Add a new todo from the input text
  const addTodo = () => {
    if (text.trim() === "") return;
    setTodos([...todos, createTodo(text)]);
    setText("");
    setIsPopupVisible(true);
  };

  // Remove a todo by id
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completed state for a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Update a todo's text
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText }
          : todo
      )
    );
  };

  // Main UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center p-4">
      <div className="relative bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        {isPopupVisible && (
          <div
            role="status"
            aria-live="polite"
            className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
          >
            Görev eklendi
          </div>
        )}
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Todo App
        </h1>

        {/* Input + add button */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Yeni todo..."
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 shadow-sm"
          />
          <button
            onClick={addTodo}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Ekle
          </button>
        </div>

        {/* Todo list / empty state */}
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center py-8 text-gray-400 text-lg">
              Listede hiçbir şey yok
            </li>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={deleteTodo}
                onToggle={toggleTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default Home;
