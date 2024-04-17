import { v4 as uuid } from 'uuid';
import { XCircleIcon, PencilSquareIcon, CheckCircleIcon, TrashIcon, CloudArrowDownIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as SolidCheck } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Todo, TodoListProps } from './types';


const TodoList: React.FC<TodoListProps> = ({isQuerying, isTransacting, todos, upsertTodo, deleteTodo}) => {
  const [editing, setEditing] = useState<string>();

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const addTodoForm = event.target as HTMLFormElement;
    const input = addTodoForm.elements[0] as HTMLInputElement;
    const newTodo: Todo = {
      id: uuid(),
      type: "Todo",
      label: input.value,
      isDone: false
    };
    upsertTodo(newTodo);
    input.value = '';
  };

  const editTodoLabel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const editTodoForm = event.target as HTMLFormElement;
    const input = editTodoForm.elements[0] as HTMLInputElement;
    const todoToUpdate = todos.find(todo => todo.id === editing);
    if (todoToUpdate) {
      upsertTodo({ ...todoToUpdate, label: input.value });
    }
    setEditing(undefined);
  };

  const toggleTodoDone = (id: string) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      upsertTodo({ ...todoToUpdate, isDone: !todoToUpdate.isDone });
    }
  }
  
  return (
    <main>
      <div className='todo-header'>
        <h1>Todos</h1>
        <div>
          {isQuerying && <CloudArrowDownIcon className='todo-icon'/>}
          {isTransacting && <CloudArrowUpIcon className='todo-icon'/>}
        </div>
      </div>
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