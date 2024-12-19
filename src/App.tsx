import { Analytics } from "@vercel/analytics/react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import { ErrorModal } from "@/components/common/Modal/ErrorModal";
import Router from "@/components/common/Router";
import { network } from "@/hooks/contract/useTonClient";
import GlobalStyle from "@/styles/globalStyles";
import theme from "@/styles/theme";
import TagManager from "react-gtm-module";
import { TomoProvider, CONNECT_MAP, TomoWalletTgSdkV2, useTomo } from "@tomo-inc/tomo-telegram-sdk";
import "@tomo-inc/tomo-telegram-sdk/dist/styles.css";
import { BASE_URL_DEV } from "@tomo-inc/tomo-telegram-sdk/example/baseUrlDev";
import { createContext, useEffect, useState } from "react";
import { internal } from "@ton/core";

const tagManagerArgs = {
  gtmId: "GTM-N6BZZ8CX",
};
TagManager.initialize(tagManagerArgs);

console.log(`You're connected to the ${network} network!`);

export const TomoContext = createContext<TomoContextType | null>(null);

interface TomoContextType {
  sdk: any; // 실제 SDK 타입으로 대체
  provider: any; // 실제 Provider 타입으로 대체
}

const App = () => {
  const sdk = new TomoWalletTgSdkV2({
    injected: true,
    metaData: { icon: "", name: "Nexton" },
  });
  const tomo_ton = sdk.tomo_ton;
  // console.log(sdk);
  // console.log(sdk.tomo_ton);

  return (
    <TomoContext.Provider value={{ sdk, provider: tomo_ton }}>
      <TomoProvider
        theme="light"
        supportedProviders={["TON"]}
        supportedConnects={[CONNECT_MAP.TOMO_MINI_APP]}
        manifestUrl={"https://d8o5s6z018yzr.cloudfront.net/manifestUrl.json"}
        tomoOptions={{
          injected: false,
          metaData: { icon: "", name: "" },
        }}
      >
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <GlobalStyle />
            <ErrorModal />
            <Analytics />
            <Router />
          </RecoilRoot>
        </ThemeProvider>
      </TomoProvider>
    </TomoContext.Provider>
  );
};
export default App;
