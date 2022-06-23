const app = require('./../app');
const ServerLogger = require('../src/helper/serverLogger');
const PORT = 9900;

app.listen(PORT, () => {
  ServerLogger.space();
  ServerLogger.info('Server is run...');
  ServerLogger.info(`- Local: http://localhost:${PORT}/`);
  ServerLogger.space();
});
