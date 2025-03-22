const app = require('express')();
const PORT = 8080;

const userRoute = require("./routes/userRoute");

app.use("/api/users", userRoute);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
