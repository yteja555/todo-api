const checkEnvironment = () => {
  if (
    !process.env.MONGO_USER_NAME ||
    !process.env.MONGO_PASSWORD ||
    !process.env.JWT_SECRET_KEY
  ) {
    console.log("Please provide environment variables");
    process.exit(555);
  }
};
module.exports = checkEnvironment;
