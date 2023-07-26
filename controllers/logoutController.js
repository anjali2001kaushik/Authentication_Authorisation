const logoutController = async (req, res) => {
  try {
    res.clearCookie("sessionToken");

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = logoutController;
