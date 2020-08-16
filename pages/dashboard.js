import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import NowPlayingComponent from "../components/dashboard/NowPlayingComponent";
import { setUser, setUserPlayBack } from "../redux/actions/app";

import styles from "../styles/Dashboard.module.css";

function Dashboard(props) {
  const { setUser, user, setUserPlayBack, currentPlayback } = props;

  useEffect(() => {
    const initFunction = async () => {
      await setUser(user);

      await setUserPlayBack(currentPlayback);
    };

    initFunction();
  }, [setUser, setUserPlayBack]);

  return (
    <div className={styles.dashboardContainer}>
      <NowPlayingComponent />
    </div>
  );
}

Dashboard.getInitialProps = async (ctx) => {
  const { req, query } = ctx;

  let storedAccessKey =
    req.cookies["access_token"] === undefined
      ? null
      : req.cookies["access_token"];

  const getUserPlayback = await fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${storedAccessKey}`,
    },
    json: true,
  });

  if (getUserPlayback.headers.get("content-type") !== null) {
    const userPlaybackJson = await getUserPlayback.json();

    return {
      user: { ...query.user },
      currentPlayback: { ...userPlaybackJson },
    };
  } else {
    return {
      user: { ...query.user },
      currentPlayback: {},
    };
  }
};

const mapDispatchToProps = (dispatch) => ({
  setUser: bindActionCreators(setUser, dispatch),
  setUserPlayBack: bindActionCreators(setUserPlayBack, dispatch),
});

export default connect(null, mapDispatchToProps)(Dashboard);
