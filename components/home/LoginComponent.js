import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import { fetchTokens } from "../../redux/actions/app";

import styles from "../../styles/Home.module.css";

function LoginComponent(props) {
  const { fetchTokens } = props;

  // useEffect(() => {
  //   fetchTokens();
  // }, [fetchTokens]);

  return (
    <div className={styles.loginComponentContainer}>
      <div>
        <div className="button-center-container">
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            href="/login_spotify"
            size="large"
          >
            Login thru Spotify
          </Button>
        </div>
        <div className={styles.disclaimerContainer}>
          <Typography variant="body2">
            Disclaimer: This website is a side project using Spotify's public
            web api. It has no affiliation or anything to do with Spotify.
          </Typography>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchTokens: bindActionCreators(fetchTokens, dispatch),
});

export default connect(null, mapDispatchToProps)(LoginComponent);
