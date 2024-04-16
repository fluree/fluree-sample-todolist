import { XCircleIcon, PencilSquareIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
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
  const [editing, setEditing] = useState<number>();

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

  // handle edit todo form submission and updates the todo label based on the input
  const editTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editTodoForm = event.target as HTMLFormElement;
    const input = editTodoForm.elements[0] as HTMLInputElement;
    const updatedTodos = todos.map(todo => {
      if (todo.id === editing) {
        return {
          ...todo,
          label: input.value
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setEditing(undefined);
  };
  
  return (
    <main>
      <h1 className="sr-only">Todos</h1>
      <form className="add-todo-form" onSubmit={addTodo}>
        <label htmlFor="todo">Enter Task</label>
        <input className="add-input" type="text" id="todo" name="todo" required />
        <button className="add-button" type="submit">
          Add
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editing !== todo.id && (<>
              <span className={todo.isDone ? "todo-done" : ""}>{todo.label}</span>
              <div className='todo-actions'>
                <button className="edit-button" type="button" onClick={() => setEditing(todo.id)}>
                  <PencilSquareIcon className="todo-icon" />
                </button>
                <button className="delete-button" type="button" onClick={() => deleteTodo(todo.id)}>
                  <TrashIcon className="todo-icon" />
                </button>
              </div>
            </>)}
            {editing === todo.id && (
              <form className="edit-todo-form" onSubmit={editTodo}>
                <input className="edit-input" type="text" id="editTodo" name="editTodo" defaultValue={todo.label} required />
                <div className='todo-actions'>
                  <button className="edit-button" type="submit">
                    <CheckCircleIcon className="todo-icon" />
                  </button>
                  <button className="cancel-button" type="button" onClick={() => setEditing(undefined)}>
                    <XCircleIcon className="todo-icon" />
                  </button>
                </div>
              </form>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TodoList;