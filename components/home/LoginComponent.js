import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

import styles from "../../styles/Home.module.css";

function LoginComponent(props) {
  const { cookies } = props;

  return (
    <div className={styles.loginComponentContainer}>
      <div>
        <div className="button-center-container">
          <Button
            variant="outlined"
            color="inherit"
            component={Link}
            href="/login_spotify"
            size="large"
          >
            Login thru Spotify
          </Button>
        </div>
        <div className={styles.disclaimerContainer}>
          <Typography variant="body2">
            Disclaimer: This website is a side project using Spotify's public
            web api. It has no affiliation or anything to do with Spotify.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
