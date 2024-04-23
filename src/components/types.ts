export interface TodoListProps {
  isQuerying: boolean;
  isTransacting: boolean;
  todos: Todo[];
  upsertTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
}

export type Todo = {
  id: string;
  type: "Todo";
  label: string;
  isDone: boolean;
}

export interface ConnectionDetailsFormProps {
  onSubmit: (cxnDetails: ConnectionDetails) => void;
}

export type ConnectionDetails = {
  db: string;
  key: string;
}