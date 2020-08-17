import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

function PlayerProgressBar(props) {
  const { currentProgress, totalTime, isPlaying } = props;

  const currentPercentage = (currentProgress / totalTime) * 100;

  const totalTimeInMinutes = millisToMinutesAndSeconds(totalTime);

  const [progressData, setProgressData] = React.useState({
    progress: currentPercentage,
    countDownMs: currentProgress,
    countDown: millisToMinutesAndSeconds(currentProgress),
    isPlaying: isPlaying,
    finished: currentProgress === totalTime,
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgressData((oldProgress) => {
        if (isPlaying) {
          let newCountDownMs = oldProgress.countDownMs + 1000;

          if (newCountDownMs === totalTime || newCountDownMs > totalTime) {
            clearInterval(timer);

            return {
              ...oldProgress,
              progress: 100,
              countDownMs: totalTime,
              countDown: millisToMinutesAndSeconds(totalTime),
              isPlaying: false,
              finished: true,
            };
          } else {
            return {
              ...oldProgress,
              progress: Math.min((newCountDownMs / totalTime) * 100, 100),
              countDownMs: newCountDownMs,
              countDown: millisToMinutesAndSeconds(newCountDownMs),
            };
          }
        } else {
          clearInterval(timer);

          return {
            ...oldProgress,
          };
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">{progressData.countDown}</Typography>
          <div style={{ flex: 1, margin: "0 8px" }}>
            <LinearProgress
              color="secondary"
              variant="determinate"
              value={progressData.progress}
            />
          </div>
          <Typography variant="subtitle2">{totalTimeInMinutes}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2">
            {progressData.isPlaying
              ? "Playing..."
              : progressData.finished
              ? "Finished"
              : "Paused"}
          </Typography>
        </div>
      </ThemeProvider>
    </div>
  );
}

const millisToMinutesAndSeconds = (millis) => {
  let minutes = Math.floor(millis / 60000);

  let seconds = ((millis % 60000) / 1000).toFixed(0);

  minutes = seconds === 60 ? minutes + 1 : minutes;

  seconds = seconds === 60 ? 0 : seconds;

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1DB954",
    },
    secondary: {
      main: "#b3b3b3",
    },
  },
  typography: {
    subtitle2: {
      fontSize: "0.75rem",
      color: "#b3b3b3",
    },
  },
});

export default PlayerProgressBar;
