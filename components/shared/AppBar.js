import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import SpotifyLogo from "./SpotifyLogo";
import UserAvatar from "./UserAvatar";

function CustomAppBar() {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <div style={{ flexGrow: 1, textAlign: "center" }}>
            <SpotifyLogo height={30} />
          </div>
          <UserAvatar />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default CustomAppBar;
