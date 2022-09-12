export default (req, res) => {
  let cookie = req.cookies;
  res.cookie("cookiename", "cookievalue", {
    maxAge: 0,
  });
};
