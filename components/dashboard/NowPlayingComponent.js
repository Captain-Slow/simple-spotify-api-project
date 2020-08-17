import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import ComputerIcon from "@material-ui/icons/Computer";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import SpeakerIcon from "@material-ui/icons/Speaker";
import CardActionArea from "@material-ui/core/CardActionArea";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import PauseRoundedIcon from "@material-ui/icons/PauseRounded";
import Fade from "@material-ui/core/Fade";

import { fetchUserPlayBack, showSnackbar } from "../../redux/actions/app";
import { showAlertDialog } from "../../redux/actions/dialogs";

import styles from "../../styles/Dashboard.module.css";

function NowPlayingComponent(props) {
  const { playBack, fetchUserPlayBack, showSnackbar, showAlertDialog } = props;

  const prevAmount = useRef({ playBack }).current;

  const [playButton, setPlayButton] = useState({
    show: false,
    playButtonVisible: true,
    previewAudio: null,
  });

  useEffect(() => {
    if (prevAmount.playBack.data !== playBack.data) {
      setPlayButton({
        ...playButton,
        previewAudio: new Audio(playBack.data.item.preview_url),
      });
    }

    return () => {
      prevAmount.playBack = playBack;
    };
  }, [playBack, playButton]);

  const refreshButtonHandler = async () => {
    await pauseAudioHandler();

    let fetchResponse = await fetchUserPlayBack();

    switch (fetchResponse.type) {
      case "SET_PLAYBACK_DATA":
        await showSnackbar(
          `Playback refreshed. Currently playing ${fetchResponse.payload.playBack.item.name}`
        );

        await setPlayButton({
          ...playButton,
          previewAudio: new Audio(
            fetchResponse.payload.playBack.item.preview_url
          ),
          playButtonVisible: true,
        });

        break;
      case "SET_PLAYBACK_DATA_FAILED_INVALID_TOKEN":
        await showAlertDialog(
          {
            title: "Session expired",
            message: "You would required to log in again.",
          },
          () => (window.location.href = "/log_out")
        );

        break;
      case "NO_PLAYBACK_DATA":
        await showSnackbar("No song is been played.", "warning");

        break;
      default:
        await showSnackbar("Failed to fetch new playback data.");
    }

    if (fetchResponse.type !== "SET_PLAYBACK_DATA") {
      setPlayButton({
        ...playButton,
        playButtonVisible: true,
      });
    }
  };

  const albumArtOnMouseHandler = async () => {
    setPlayButton({
      ...playButton,
      show: !playButton.show,
    });
  };

  const playButtonHandler = async () => {
    if (playButton.playButtonVisible) {
      playAudioHandler();
    } else {
      pauseAudioHandler();
    }

    setPlayButton({
      ...playButton,
      playButtonVisible: !playButton.playButtonVisible,
    });
  };

  const playAudioHandler = () => {
    playButton.previewAudio.play();
  };

  const pauseAudioHandler = () => {
    playButton.previewAudio.pause();
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
            <CardActionArea
              className={styles.albumImgCardAction}
              onMouseEnter={albumArtOnMouseHandler}
              onMouseLeave={albumArtOnMouseHandler}
              onClick={playButtonHandler}
            >
              <Fade in={playButton.show}>
                <div className={styles.playButtonContainer}>
                  {playButton.playButtonVisible ? (
                    <PlayArrowRoundedIcon
                      style={{ fontSize: "6rem", color: "white" }}
                      fontSize="large"
                    />
                  ) : (
                    <PauseRoundedIcon
                      style={{ fontSize: "6rem", color: "white" }}
                      fontSize="large"
                    />
                  )}
                </div>
              </Fade>
              <img
                className={styles.albumImg}
                src={playBack.data.item.album.images[0].url}
              />
            </CardActionArea>
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
            <div className={styles.deviceNameContainer}>
              <Typography
                style={{ fontSize: "0.7rem" }}
                color="inherit"
                variant="body2"
              >
                {`Playing now on ${playBack.data.device.name}`}
              </Typography>
              <div className={styles.iconDeviceContainer}>
                {playBack.data.device.type.toLowerCase() === "computer" ? (
                  <ComputerIcon style={{ fontSize: "1rem" }} fontSize="small" />
                ) : playBack.data.device.type.toLowerCase() === "smartphone" ? (
                  <SmartphoneIcon
                    style={{ fontSize: "1rem" }}
                    fontSize="small"
                  />
                ) : (
                  <SpeakerIcon style={{ fontSize: "1rem" }} fontSize="small" />
                )}
              </div>
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
  showSnackbar: bindActionCreators(showSnackbar, dispatch),
  showAlertDialog: bindActionCreators(showAlertDialog, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlayingComponent);
