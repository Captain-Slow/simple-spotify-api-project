import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
import Grow from "@material-ui/core/Grow";

import {
  showSnackbar,
  hideSnackbar,
  resetSnackbar,
} from "../../redux/actions/app";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomSnackBar(props) {
  const { snackbar, hideSnackbar, resetSnackbar } = props;

  const { show, func, message, type } = snackbar;

  const handleClose = async (event, reason) => {
    await hideSnackbar();

    if (func !== null) {
      func();
    }
  };

  const cleanup = async () => {
    await resetSnackbar();
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={show}
      TransitionComponent={Grow}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={cleanup}
      message={message}
      style={{ margin: "8px 0" }}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    >
      <Alert
        style={{ width: "100%" }}
        onClose={handleClose}
        severity={type === "success" || type === "default" ? "success" : type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

const mapStateToProps = (state) => {
  return {
    snackbar: state.app.snackbar,
  };
};

const mapDispatchToProps = (dispatch) => ({
  showSnackbar: bindActionCreators(showSnackbar, dispatch),
  hideSnackbar: bindActionCreators(hideSnackbar, dispatch),
  resetSnackbar: bindActionCreators(resetSnackbar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomSnackBar);
