export const getAllCourse = (req, res, next) => {
  console.log("All Courses");
  res.status(200).json({
    success: true,
    message: "All Courses",
  });
};
