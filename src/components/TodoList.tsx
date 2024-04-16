import { XCircleIcon, PencilSquareIcon, CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as SolidCheck } from '@heroicons/react/24/solid';
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

  const editTodoLabel = (event: React.FormEvent<HTMLFormElement>) => {
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

  const toggleTodoDone = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          isDone: !todo.isDone
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  return (
    <main>
      <h1>Todos</h1>
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
              {!todo.isDone && <CheckCircleIcon className="todo-icon todo-check-icon" onClick={() => toggleTodoDone(todo.id)}/>}
              {todo.isDone && <SolidCheck className="todo-icon todo-check-icon todo-checked" onClick={() => toggleTodoDone(todo.id)}/>}
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
              <form className="edit-todo-form" onSubmit={editTodoLabel}>
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