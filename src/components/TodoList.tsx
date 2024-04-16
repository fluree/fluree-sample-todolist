import React, { useState } from 'react';

interface TodoListProps {
  // Define props here
}

type Todo = {
  id: number;
  label: string;
  isDone: boolean;
}

const TodoList: React.FC<TodoListProps> = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const addTodoForm = event.target as HTMLFormElement;
    const input = addTodoForm.elements[0] as HTMLInputElement;
    const newTodo: Todo = {
      id: todos.length === 0 ? 1 : Math.max(...todos.map(t => t.id)) + 1,
      label: input.value,
      isDone: false
    };
    setTodos([...todos, newTodo]);
    input.value = '';
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <form className="add-todo-form" onSubmit={addTodo}>
        <label htmlFor="todo">Enter Task</label>
        <input type="text" id="todo" name="todo" required />
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.label}
            <button className="delete-button" type="button" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TodoList;