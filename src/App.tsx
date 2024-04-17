import './App.css';
import TodoList from './components/TodoList';
import { useCallback, useEffect, useState } from 'react';
import { Todo } from './components/types';
import useFlureeClient from './hooks/useFlureeClient';

const defaultContext = {
  "id": "@id",
  "type": "@type"
};

function App() {
  const [isQuerying, setIsQuerying] = useState(false);
  const [isTransacting, setIsTransacting] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);

  const flureeClient = useFlureeClient(
    import.meta.env.VITE_FLUREE_DB,
    import.meta.env.VITE_FLUREE_API_KEY,
    defaultContext
  );

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

  const upsertTodo = useCallback((todo: Todo) => {
    if (flureeClient === null) { return; }
    setIsTransacting(true);
    return flureeClient.upsert(todo).send().then(() => queryTodos()).finally(() => setIsTransacting(false));
  }, [flureeClient, queryTodos]);

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

  useEffect(() => {
    queryTodos();
  }, [queryTodos]);

  return (
    <TodoList isQuerying={isQuerying} isTransacting={isTransacting} todos={todos} upsertTodo={upsertTodo} deleteTodo={deleteTodo}/>
  );
}

export default App;
