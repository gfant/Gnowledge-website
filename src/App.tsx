import { useState, useEffect } from 'react';
import { GnoWSProvider } from '@gnolang/gno-js-client';
import { IAccountContext } from './context/accountContext.types.js';
import { IProviderContext } from './context/providerContext.types.js';
import AccountContext from './context/AccountContext';
import "./style.css"
import ProviderContext from './context/ProviderContext';

import Config from './config';

import PageHome from './pages/pageHome';
import PageMember from './pages/pageMember';
import PageQuestion from './pages/pageQuestion';
import PageMakeQuestion from './pages/pageMakeQuestion';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const App = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [chainID, setChainID] = useState<string | null>(null);

  // Only God knows
  const accountContext: IAccountContext = {
    address,
    chainID,

    setAddress,
    setChainID
  };

  // Provides the websocket required to connect to chain
  const [provider, setProvider] = useState<GnoWSProvider | null>(
    new GnoWSProvider(Config.CHAIN_RPC)
  );

  useEffect(() => { }, [provider]);

  // Still not sure
  const wsProvider: IProviderContext = {
    provider,
    setProvider
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PageHome />,
    },
    {
      path: "/member/:address",
      element: <PageMember />,
    },
    {
      path: "/make-question",
      element: <PageMakeQuestion />,
    },
    {
      path: "/question/:questionId",
      element: <PageQuestion />,
    },
  ])

  return (
    <ProviderContext.Provider value={wsProvider}>
      <AccountContext.Provider value={accountContext}>
        <RouterProvider router={router} />
      </AccountContext.Provider>
    </ProviderContext.Provider>
  );
};

export default App;
