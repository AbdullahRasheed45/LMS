const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const { handleError, notFound } = require("./middlewares/errorhandler");
const { userRouter } = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const googleRouter = require("./routes/googleRoutes");
PORT = process.env.PORT || 3000;
const passportSetup = require("./utils/passport");
const tutCatRouter = require("./routes/tutCatRoutes");
const tutorialRouter = require("./routes/tutorialRoutes");
const newsRoutes = require("./routes/newsletterRoutes");
const reviewRoutes = require("./routes/reviewsRoutes");
const contactRouter = require("./routes/contactRoutes");
const videoRouter = require("./routes/videoRoutes");
const docRouter = require("./routes/documentRoutes");
const docCatRouter = require("./routes/documentCategoryRoutes");
const blogCatRouter = require("./routes/blogCategoryRoutes");
const blogRouter = require("./routes/blogRoutes");
const videoCatRouter = require("./routes/videoCategoryRoutes");
const courseCatRouter = require("./routes/courseCategoryRoutes");
const courseRouter = require("./routes/courseRoutes");
const rateLimit = require("./utils/reqLimit");
const workRouter = require("./routes/workRoutes");
const projectCatRouter = require("./routes/projectCategoryRoutes");
const projectRouter = require("./routes/projectRoutes");
const bookSessionRouter = require("./routes/bookSessionRoutes");
const qnaRouter = require("./routes/qnaRoutes");

dbConnect();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "mysecret",
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 12 * 60 * 60,
      mongooseConnection: dbConnect(), // Add this line
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:4000/auth/google">Login With Google</a>`);
});

app.set("trust proxy", 1);
app.use(
  "/api",
  rateLimit(60 * 60 * 1000, "Hours", 50, "Only 50 Request Allowed")
);
app.use("/api/user", userRouter);
app.use("/", googleRouter);
app.use("/api/tutorial/category", tutCatRouter);
app.use("/api/tutorial", tutorialRouter);
app.use("/api/newsletter", newsRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/contact", contactRouter);
app.use("/api/video", videoRouter);
app.use("/api/video/category", videoCatRouter);
app.use("/api/documentation", docRouter);
app.use("/api/documentation/category", docCatRouter);
app.use("/api/blog/category", blogCatRouter);
app.use("/api/blog", blogRouter);
app.use("/api/course", courseRouter);
app.use("/api/course/category", courseCatRouter);
app.use("/api/work", workRouter);
app.use("/api/project", projectRouter);
app.use("/api/project/category", projectCatRouter);
app.use("/api/book-session", bookSessionRouter);
app.use("/api/qna", qnaRouter);
app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
