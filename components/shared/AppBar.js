import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import SpotifyLogo from "./SpotifyLogo";
import UserAvatar from "./UserAvatar";

import styles from "../../styles/AppBar.module.css";

function CustomAppBar() {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar className={styles.toolBar}>
        <div className={styles.toolBarContainer}>
          <div className={styles.toolBarAppLogoContainer}>
            <SpotifyLogo height={30} />
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
