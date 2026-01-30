export const createTodo = (text) => {
  return {
    id: Date.now(),
    text: text,
    completed: false,
  };
};
