import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";

import { fetchTokens } from "../../redux/actions/app";

import styles from "../../styles/Home.module.css";

function LoginComponent(props) {
  const { fetchTokens } = props;

  // useEffect(() => {
  //   fetchTokens();
  // }, [fetchTokens]);

  return (
    <div className={styles.loginComponentContainer}>
      <div className={styles.avatarContainer}>
        <IconButton
          aria-label="user avatar"
          aria-controls="user avatar"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchTokens: bindActionCreators(fetchTokens, dispatch),
});

export default connect(null, mapDispatchToProps)(LoginComponent);
