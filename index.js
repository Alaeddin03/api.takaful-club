const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
const port = 8000;
const programsRouter = require("./routes/programs");
const driversRouter = require("./routes/drivers");
const loginRouter = require("./routes/login");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// routers

app.use("/programs", programsRouter);
app.use("/drivers", driversRouter);
app.use("/login", loginRouter);


// serving static files

app.use(fileUpload());
app.use(express.static("public"));
app.use(express.static('files'));
app.use('/static', express.static('public'));

app.post('/upload', (req, res) => {

  console.log(req);

  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/static/${file.name}`, function(err) {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  });

  res.json({file: `public/static/${file.name}`});

});


/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`takaful back end server listening at http://localhost:${port}`);
});