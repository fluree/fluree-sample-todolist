import { useState, useEffect } from 'react';
import { FlureeClient } from '@fluree/fluree-client';
import { ContextStatement } from '@fluree/fluree-client/dist/types/ContextTypes';
import { ConnectionDetails } from '../components/types';

const useFlureeClient = (db: string, key: string, defaultContext: ContextStatement | undefined) => {
  const [flureeClient, setFlureeClient] = useState<FlureeClient | null>(null);
  const [connectionDetails, setConnectionDetails] = useState<ConnectionDetails>({db, key})

  useEffect(() => {
    const initializeFlureeClient = async () => {
      if (connectionDetails.db === "doubleclick_to_replace") { return; }
      try {
        const flureeClient = new FlureeClient({
          isFlureeHosted: true,
          apiKey: connectionDetails.key,
          ledger: connectionDetails.db,
          defaultContext
        });
        await flureeClient.connect();
        setFlureeClient(flureeClient);
      } catch (error) {
        console.error('Failed to initialize Fluree client:', error);
      }
    };

    initializeFlureeClient();
  }, [connectionDetails, defaultContext]);

  return {flureeClient, setConnectionDetails};
};

export default useFlureeClient;