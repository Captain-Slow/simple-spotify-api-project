import Head from "next/head";
import Link from "next/link";

import LoginComponent from "../components/LoginComponent";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function Home() {
  return (
    <>
      <Head>
        <title>Kew side project</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <div>
        <ThemeProvider theme={theme}>
          <LoginComponent />
        </ThemeProvider>
      </div>
    </>
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

export default Home;
