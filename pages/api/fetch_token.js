export default (req, res) => {
  const storedStates = req.cookies ? true : false;

  if (storedStates) {
    const accessToken = "access_token";

    const refreshToken = "refresh_token";

    res.statusCode = 200;

    res.json({
      accessToken: req.cookies[accessToken],
      refreshToken: req.cookies[refreshToken],
    });
  } else {
    res.statusCode = 500;

    res.json({ error: "No tokens" });
  }
};
