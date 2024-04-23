import React from 'react';
import { ConnectionDetailsFormProps } from './types';

interface ConnectionDetailsFormElements extends HTMLFormControlsCollection {
  db: HTMLInputElement,
  key: HTMLInputElement
}
interface ConnectionDetailsFormElement extends HTMLFormElement {
  readonly elements: ConnectionDetailsFormElements;
}

const ConnectionDetailsForm: React.FC<ConnectionDetailsFormProps> = ({onSubmit}) => {

  const connectionDetailsFormSubmit = (event: React.FormEvent<ConnectionDetailsFormElement>) => {
    event.preventDefault();
    const db = event.currentTarget.elements.db.value;
    const key = event.currentTarget.elements.key.value;
    onSubmit({db, key});
  };
  
  return (
    <main>
      <div className='todo-header'>
        <h1>Fluree Cloud Connection Details</h1>
      </div>
      <form className="cxn-details-form" onSubmit={connectionDetailsFormSubmit}>
        <label htmlFor="db">Dataset ID</label>
        <input className="cxn-details-input" type="text" id="db" name="db" required />
        <label htmlFor="key">API Key</label>
        <input className="cxn-details-input" type="text" id="key" name="key" required />
        <button className="cxn-details-button" type="submit">
          Connect
        </button>
      </form>
    </main>
  );
};

export default ConnectionDetailsForm;