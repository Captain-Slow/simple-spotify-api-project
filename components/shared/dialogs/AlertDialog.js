import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  hideAlertDialog,
  resetAlertDialog,
} from "../../../redux/actions/dialogs";

function AlertDialog(props) {
  const { hideAlertDialog, resetAlertDialog, alertDialog } = props;

  const { show, func, content } = alertDialog;

  const [disableOkBtn, setDisableOkBtn] = React.useState(false);

  const handleClose = async () => {
    await setDisableOkBtn(true);

    await hideAlertDialog();

    if (func !== null) {
      func();
    }
  };

  const cleanup = async () => {
    await resetAlertDialog();
  };

  return (
    <Dialog
      open={show}
      onClose={handleClose}
      onExited={cleanup}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="xs"
      fullWidth
    >
      {show ? (
        <>
          <DialogTitle id="alert-dialog-title">{content.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={disableOkBtn}
              onClick={handleClose}
              color="primary"
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </>
      ) : (
        <div></div>
      )}
    </Dialog>
  );
}

const mapStateToProps = (state) => {
  return {
    alertDialog: state.dialogs.alertDialog,
  };
};

const mapDispatchToProps = (dispatch) => ({
  hideAlertDialog: bindActionCreators(hideAlertDialog, dispatch),
  resetAlertDialog: bindActionCreators(resetAlertDialog, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog);
