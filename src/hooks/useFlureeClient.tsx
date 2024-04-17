import { useState, useEffect } from 'react';
import { FlureeClient } from '@fluree/fluree-client';
import { ContextStatement } from '@fluree/fluree-client/dist/types/ContextTypes';

const useFlureeClient = (db: string, apiKey: string, defaultContext: ContextStatement | undefined) => {
  const [flureeClient, setFlureeClient] = useState<FlureeClient | null>(null);

  useEffect(() => {
    const initializeFlureeClient = async () => {
      try {
        const flureeClient = new FlureeClient({
          isFlureeHosted: true,
          apiKey,
          ledger: db,
          defaultContext
        });
        await flureeClient.connect();
        setFlureeClient(flureeClient);
      } catch (error) {
        console.error('Failed to initialize Fluree client:', error);
      }
    };

    initializeFlureeClient();
  }, [db, apiKey, defaultContext]);

  return flureeClient;
};

export default useFlureeClient;