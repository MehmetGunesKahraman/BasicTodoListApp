// Build a new todo object with a unique id
export const createTodo = (text) => {
  return {
    id: Date.now(),
    text: text,
    completed: false,
  };
};
