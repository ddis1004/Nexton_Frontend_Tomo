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
// import { TonProvider } from "@tomo-inc/tomo-telegram-sdk/dist/v2/provider/TonProvider/TonProvider";

const tagManagerArgs = {
  gtmId: "GTM-N6BZZ8CX",
};
TagManager.initialize(tagManagerArgs);

console.log(`You're connected to the ${network} network!`);

const App = () => {
  const sdk = new TomoWalletTgSdkV2({
    injected: true,
    metaData: { icon: "", name: "Nexton" },
  });
  sdk._initialize();
  console.log(sdk);
  console.log(sdk.tomo_ton);

  return (
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
  );
};
export default App;
