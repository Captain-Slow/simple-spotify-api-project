import React, { useEffect } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as queryString from "query-string";

import LoginComponent from "../components/home/LoginComponent";
import { showSnackbar } from "../redux/actions/app";

function Home(props) {
  const { showSnackbar } = props;

  useEffect(() => {
    const initFunction = async () => {
      let searchParams = queryString.parse(location.search);

      if (
        Object.entries(searchParams).length > 0 &&
        searchParams.error !== undefined
      ) {
        switch (searchParams.error) {
          case "invalid_token":
            await showSnackbar(
              "Error logging in, invalid token is passed",
              "error"
            );

            break;
          case "state_mismatch":
            await showSnackbar(
              "Error logging in, please contact support if problem persists",
              "error"
            );

            break;
          default:
            break;
        }

        window.history.replaceState({}, document.title, "/");
      }
    };

    initFunction();
  }, [showSnackbar]);

  return (
    <>
      <Head>
        <title>nowPlaying by Kew - Home</title>
      </Head>
      <LoginComponent />
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  showSnackbar: bindActionCreators(showSnackbar, dispatch),
});

export default connect(null, mapDispatchToProps)(Home);
