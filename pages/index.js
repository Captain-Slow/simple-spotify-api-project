import Head from "next/head";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { useEffect } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import LoginComponent from "../components/LoginComponent";
import { fetchTokens } from "../redux/actions/app";

function Home(props) {
  const { fetchTokens } = props;

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

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

const mapDispatchToProps = (dispatch) => ({
  fetchTokens: bindActionCreators(fetchTokens, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
