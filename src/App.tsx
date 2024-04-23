import './App.css';
import TodoList from './components/TodoList';
import { useCallback, useEffect, useState } from 'react';
import { Todo } from './components/types';
import useFlureeClient from './hooks/useFlureeClient';
import ConnectionDetailsForm from './components/ConnectionDetailsForm';

const defaultContext = {
  "id": "@id",
  "type": "@type"
};

function App() {
  // application state variables
  const [isQuerying, setIsQuerying] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  // fluree-client set up
  const {flureeClient, setConnectionDetails} = useFlureeClient(
    import.meta.env.VITE_FLUREE_DB,
    import.meta.env.VITE_FLUREE_API_KEY,
    defaultContext
  );

  /* functions that use the fluree-client to query, upsert, and delete todos */
  // Read Todos
  const queryTodos = useCallback(async () => {
    if (flureeClient === null) { return; }
    setIsQuerying(true);
    return flureeClient.query({
      "select": {"?todos": ["id", "type", "label", "isDone"]},
      "where": {
        "id": "?todos",
        "type": "Todo"
      }
    })
    .send()
    .then((results => {
      setTodos(results);
    })).finally(() => setIsQuerying(false));
  },[flureeClient]);

  // Create and Update Todos
  const upsertTodo = useCallback((todo: Todo) => {
    if (flureeClient === null) { return; }
    setIsTransacting(true);
    return flureeClient.upsert(todo).send().then(() => queryTodos()).finally(() => setIsTransacting(false));
  }, [flureeClient, queryTodos]);

  // Delete Todos
  const deleteTodo = useCallback((id: string) => {
    if (flureeClient === null) { return; }
    setIsTransacting(true);
    return flureeClient.transact({
      "delete": {
        id,
        "?predicates": "?objects"
      },
      "where": {
        id,
        "?predicates": "?objects"
      }
    }).send().then(() => queryTodos()).finally(() => setIsTransacting(false));
  }, [flureeClient, queryTodos]);

  // useEffect to kick off initial Todo Query
  useEffect(() => {
    queryTodos();
  }, [queryTodos]);

  // Conditional render that displays the TodoList if connected to Fluree Cloud and the Connection Form if not
  return (<>
    {flureeClient === null && import.meta.env.VITE_FLUREE_DB === "doubleclick_to_replace" &&
      <ConnectionDetailsForm onSubmit={setConnectionDetails} />
    }
    {flureeClient !== null &&
      <TodoList isQuerying={isQuerying} isTransacting={isTransacting} todos={todos} upsertTodo={upsertTodo} deleteTodo={deleteTodo}/>
    }
  </>);
}

export default App;
