import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";

import { fetchUserPlayBack } from "../../redux/actions/app";

import styles from "../../styles/Dashboard.module.css";

function NowPlayingComponent(props) {
  const { playBack, fetchUserPlayBack } = props;

  const refreshButtonHandler = async () => {
    await fetchUserPlayBack();
  };

  return (
    <div className={styles.nowPlayingContainer}>
      {playBack.playing ? (
        <>
          <Card
            raised
            square
            elevation={6}
            className={styles.albumImgContainer}
          >
            <img
              className={styles.albumImg}
              src={playBack.data.item.album.images[0].url}
            />
          </Card>
          <div className={styles.albumDetailContainer}>
            <Typography color="inherit" variant="h6" gutterBottom>
              {playBack.data.item.name}
            </Typography>
            <div className={styles.artistTextContainer}>
              <Typography color="inherit" variant="body2" gutterBottom>
                {playBack.data.item.artists_modified}
              </Typography>
            </div>
            <div className={styles.refreshButtonContainer}>
              <Button
                variant="outlined"
                color="inherit"
                size="large"
                onClick={refreshButtonHandler}
                endIcon={<RefreshIcon />}
              >
                Refresh
              </Button>
            </div>
          </div>
        </>
      ) : playBack.fetching ? (
        <CircularProgress />
      ) : (
        <div style={{ color: "white" }}>
          <Typography color="inherit" variant="h6" gutterBottom>
            You're currently not playing any music.
          </Typography>
          <div className={styles.refreshButtonContainer}>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={refreshButtonHandler}
              endIcon={<RefreshIcon />}
            >
              Refresh
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    playBack: state.app.playBack,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchUserPlayBack: bindActionCreators(fetchUserPlayBack, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlayingComponent);
