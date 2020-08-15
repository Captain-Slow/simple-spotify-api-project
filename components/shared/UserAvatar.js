import React, { useState } from "react";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";

import styles from "../../styles/UserAvatar.module.css";

function UserAvatar(props) {
  const { isAuthenticated, user } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Fade in={isAuthenticated} timeout={500}>
      {isAuthenticated ? (
        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar
              className={styles.userAvatarImg}
              style={{ width: 24, height: 24 }}
              alt="Remy Sharp"
              src={user.images[0].url}
            />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              className={styles.menuItem}
              component={Link}
              style={{ textDecoration: "none" }}
              href="/log_out"
            >
              <ListItemText primary="Log Out" />
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <div></div>
      )}
    </Fade>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.app.user,
    isAuthenticated: state.app.isAuthenticated,
  };
};

export default connect(mapStateToProps, null)(UserAvatar);
