import Button from "@material-ui/core/Button";
import Link from "next/link";
import Typography from "@material-ui/core/Typography";

import styles from "../../styles/Home.module.css";

function LoginComponent() {
  return (
    <div className={styles.loginComponentContainer}>
      <div>
        <div className="button-center-container">
          <Link href="/login_spotify">
            <Button
              variant="outlined"
              color="inherit"
              href="/login_spotify"
              size="large"
            >
              Login thru Spotify
            </Button>
          </Link>
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
