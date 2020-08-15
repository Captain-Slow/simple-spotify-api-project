import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import styles from "../../styles/Dashboard.module.css";

function NowPlayingComponent(props) {
  const { playBack } = props;

  return (
    <div className={styles.nowPlayingContainer}>
      {Object.entries(playBack).length > 0 ? (
        <>
          <Card
            raised
            square
            elevation={6}
            className={styles.albumImgContainer}
          >
            <img
              className={styles.albumImg}
              src={playBack.item.album.images[0].url}
            />
          </Card>
          <div className={styles.albumDetailContainer}>
            <Typography color="inherit" variant="h6" gutterBottom>
              {playBack.item.name}
            </Typography>
            <div className={styles.artistTextContainer}>
              <Typography color="inherit" variant="body2" gutterBottom>
                {playBack.item.artists_modified}
              </Typography>
            </div>
          </div>
        </>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    playBack: state.app.playBack,
  };
};

export default connect(mapStateToProps, null)(NowPlayingComponent);
