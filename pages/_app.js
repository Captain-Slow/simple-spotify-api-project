import "../styles/globals.css";
import { Provider as StoreProvider } from "react-redux";

import stores from "../redux/stores/configureStore";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={stores}>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
