const verifyController = async (req, res) => {
  const { email, verificationCode } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user && user.verificationCode === verificationCode) {
      return res.status(200).json({ message: "Verification successful" });
    }

    return res.status(401).json({ message: "Invalid verification code" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = verifyController;
