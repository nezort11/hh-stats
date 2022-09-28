import "../styles/globals.css";
import type { AppProps } from "next/app";

import { store, persistor } from "store";
import { Provider } from "react-redux";
import { Loader } from "components/Loader";
import { PersistGate } from "redux-persist/integration/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loader />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
