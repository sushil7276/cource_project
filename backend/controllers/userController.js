export const getAllUsers = (req, res, next) => {
  console.log("All Users");
  res.status(200).json({
    success: true,
    message: "All Users",
  });
};
