class ServerLogger {
  static LOG = Object.freeze({
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
  });

  static info(message) {
    console.log(`[${this.LOG.INFO}] ${message}`);
  }

  static warn(message) {
    console.log(`[${this.LOG.WARN}] ${message}`);
  }

  static error(message) {
    console.log(`[${this.LOG.ERROR} ${message}]`);
  }
}

module.exports = ServerLogger;
