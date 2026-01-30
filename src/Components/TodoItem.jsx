import { useState } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() === "") return;
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl border-2 border-indigo-200 shadow-md">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 border-2 border-indigo-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          autoFocus
        />
        <button
          onClick={handleEdit}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Kaydet
        </button>
        <button
          onClick={handleCancel}
          className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          İptal
        </button>
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 p-4 rounded-xl border border-gray-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all duration-200">
      <span
        onClick={() => onToggle(todo.id)}
        className={`cursor-pointer flex-1 text-lg ${
          todo.completed ? "line-through text-gray-400" : "text-gray-700 font-medium"
        }`}
      >
        {todo.text}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Düzenle
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Sil
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
