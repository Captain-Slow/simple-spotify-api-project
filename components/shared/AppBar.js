import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import UserAvatar from "./UserAvatar";

import styles from "../../styles/AppBar.module.css";

function CustomAppBar() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar className={styles.toolBar}>
        <div className={styles.toolBarContainer}>
          <div className={styles.toolBarAppLogoContainer}>
            <Typography
              style={{
                fontFamily: "'Shadows Into Light Two', cursive",
                fontSize: "1.2rem",
                letterSpacing: "0.2rem",
              }}
              variant="body1"
            >
              nowPlaying
            </Typography>
          </div>
          <div className={styles.toolBarUserAvatarContainer}>
            <UserAvatar />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
