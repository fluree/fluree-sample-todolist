import React from 'react';
import { ConnectionDetailsFormProps } from './types';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

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
      <div className='fluree-button-container'>
        <a className='fluree-button' href='https://data.flur.ee/' target='_blank'>
          <span style={{marginRight: 15}}>Open Fluree Cloud</span>
          <ArrowTopRightOnSquareIcon className='todo-icon'/>
        </a>
      </div>
    </main>
  );
};

export default ConnectionDetailsForm;