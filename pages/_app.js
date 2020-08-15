import Head from "next/head";
import { Provider as StoreProvider } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import AppBar from "../components/shared/AppBar";
import stores from "../redux/stores/configureStore";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider store={stores}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Kew side project</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <AppBar />
        <div className="main-container">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </StoreProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#191414",
    },
    secondary: {
      main: "#1DB954",
    },
  },
});

export default MyApp;
