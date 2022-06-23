const colors = require('colors');

class ServerLogger {
  static LOG = Object.freeze({
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
  });

  static space() {
    console.log();
  }

  static info(message) {
    console.log(` ${this.LOG.INFO} `.bgGreen + ` ${message}`);
  }

  static warn(message) {
    console.log(` ${this.LOG.WARN} `.bgYellow + ` ${message}`);
  }

  static error(message) {
    console.log(` ${this.LOG.ERROR} `.bgRed + ` ${message}]`);
  }
}

module.exports = ServerLogger;
