const app = require('./../app');
const ServerLogger = require('../src/helper/serverLogger');
const PORT = 9900;

app.listen(PORT, () => {
  ServerLogger.info(`${PORT} Server is run...`);
});
