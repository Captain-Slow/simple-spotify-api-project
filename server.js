const express = require("express");
const next = require("next");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const querystring = require("querystring");
const request = require("request");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const stateKey = "spotify_auth_state";
const refreshToken = "refresh_token";
const accessToken = "access_token";

app.prepare().then(() => {
  const server = express();

  server.use(cors()).use(cookieParser());

  server.get("/", async (req, res) => {
    let storedAccessKey =
      req.cookies[accessToken] === undefined ? null : req.cookies[accessToken];

    if (storedAccessKey !== null) {
      const getUserRes = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedAccessKey}`,
        },
        json: true,
      });

      const json = await getUserRes.json();

      if (json.error === undefined) {
        res.redirect("/dashboard");
      } else {
        await res.clearCookie(accessToken);

        await res.clearCookie(refreshToken);

        return app.render(req, res, "/", req.query);
      }
    } else {
      return app.render(req, res, "/", req.query);
    }
  });

  server.get("/dashboard", async (req, res) => {
    let storedAccessKey =
      req.cookies[accessToken] === undefined ? null : req.cookies[accessToken];

    if (storedAccessKey !== null) {
      const getUserRes = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedAccessKey}`,
        },
        json: true,
      });

      const json = await getUserRes.json();

      if (json.error === undefined) {
        const query = {
          user: json,
        };

        return app.render(req, res, "/dashboard", query);
      } else {
        await res.clearCookie(accessToken);

        await res.clearCookie(refreshToken);

        res.redirect("/");
      }
    } else {
      res.redirect("/");
    }
  });

  server.get("/log_out", async (req, res) => {
    await res.clearCookie(accessToken);

    await res.clearCookie(refreshToken);

    res.redirect("/");
  });

  server.get("/login_spotify", (req, res) => {
    var state = generateRandomString(16);

    res.cookie(stateKey, state);

    res.clearCookie(accessToken);

    res.clearCookie(refreshToken);

    var scope = "user-read-private user-read-email user-read-playback-state";

    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state,
        })
    );
  });

  server.get("/callback", (req, res) => {
    var code = req.query.code || null;

    var state = req.query.state || null;

    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(
        "#" +
          querystring.stringify({
            error: "state_mismatch",
          })
      );
    } else {
      res.clearCookie(stateKey);

      var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            new Buffer(client_id + ":" + client_secret).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token,
            refresh_token = body.refresh_token;

          res.cookie(accessToken, access_token);

          res.cookie(refreshToken, refresh_token);

          res.redirect(`${process.env.REDIRECT_URL}`);
        } else {
          res.redirect(
            "/#" +
              querystring.stringify({
                error: "invalid_token",
              })
          );
        }
      });
    }
  });

  server.get("/refresh_token", function (req, res) {
    var refresh_token = req.query.refresh_token;

    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(`${client_id}:${client_secret}`).toString("base64"),
      },
      form: {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;

        res.send({
          access_token: access_token,
        });
      }
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`Our app is running on port ${port}`);
  });
});

function generateRandomString(length) {
  var text = "";

  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}
