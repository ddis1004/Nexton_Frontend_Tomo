import { TomoWalletTgSdkV2 } from "@tomo-inc/tomo-telegram-sdk";
import React, { createContext, useEffect, useState } from "react";

export const TomoContext = React.createContext({});
export const conttext = createContext(null);

const TomoProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [sdk, setSdk] = useState(null);

  useEffect(() => {
    const sdk = new TomoWalletTgSdkV2({
      injected: true,
      metaData: { icon: "", name: "Nexton" },
    });

    setSdk(sdk);
    setProvider(sdk.tomo_ton);
  }, []);

  return (<TomoContext.Provider value={{ sdk, provider }}>
    {children}
  </TomoContext.Provider>);
};
