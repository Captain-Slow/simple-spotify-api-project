export default async (req, res) => {
  const refreshToken = "refresh_token";

  const accessToken = "access_token";

  let storedAccessKey =
    req.cookies[accessToken] === undefined ? null : req.cookies[accessToken];

  if (storedAccessKey !== null) {
    const getUserPlaybackRes = await fetch(
      "https://api.spotify.com/v1/me/player",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${storedAccessKey}`,
        },
        json: true,
      }
    );

    const json = await getUserPlaybackRes.json();

    if (json.error === undefined) {
      res.statusCode = 200;

      res.json({ playback: json });
    } else {
      await res.clearCookie(accessToken);

      await res.clearCookie(refreshToken);

      res.statusCode = 200;

      res.json({ error: "Invalid tokens" });
    }
  } else {
    res.statusCode = 200;

    res.json({ error: "No tokens" });
  }
};
