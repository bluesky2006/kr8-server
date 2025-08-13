const app = require('./app');
const port = 3000;

app.listen(port, () => {
  if (!port) {
    console.log('server not running');
  } else {
    console.log(`server listening on port ${port}`);
  }
});
