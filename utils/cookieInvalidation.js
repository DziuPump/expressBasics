export default (req, res) => {
  res.cookie("session_token", { maxAge: 0 });
};
