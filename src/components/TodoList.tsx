import { v4 as uuid } from 'uuid';
import { XCircleIcon, PencilSquareIcon, CheckCircleIcon, TrashIcon, CloudArrowDownIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as SolidCheck } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { Todo, TodoListProps } from './types';

interface AddTodoFormElements extends HTMLFormControlsCollection {
  addTodoLabelInput: HTMLInputElement
}
interface AddTodoFormElement extends HTMLFormElement {
  readonly elements: AddTodoFormElements;
}

interface EditTodoFormElements extends HTMLFormControlsCollection {
  editTodoLabelInput: HTMLInputElement
}
interface EditTodoFormElement extends HTMLFormElement {
  readonly elements: EditTodoFormElements;
}


const TodoList: React.FC<TodoListProps> = ({isQuerying, isTransacting, todos, upsertTodo, deleteTodo}) => {
  const [editing, setEditing] = useState<string>();

  const addTodo = (event: React.FormEvent<AddTodoFormElement>) => {
    event.preventDefault();
    const labelInput = event.currentTarget.elements.addTodoLabelInput;
    const newTodo: Todo = {
      id: uuid(),
      type: "Todo",
      label: labelInput.value,
      isDone: false
    };
    upsertTodo(newTodo);
    labelInput.value = '';
  };

  const editTodoLabel = (event: React.FormEvent<EditTodoFormElement>) => {
    event.preventDefault();
    const labelInput = event.currentTarget.elements.editTodoLabelInput;
    const todoToUpdate = todos.find(todo => todo.id === editing);
    if (todoToUpdate) {
      upsertTodo({ ...todoToUpdate, label: labelInput.value });
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
        <label htmlFor="addTodoLabelInput">Enter Task</label>
        <input className="add-input" type="text" id="addTodoLabelInput" name="addTodoLabelInput" required />
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
                <input className="edit-input" type="text" id="editTodoLabelInput" name="editTodoLabelInput" defaultValue={todo.label} required />
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