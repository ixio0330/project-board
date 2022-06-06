class Response {
  #status = 0;
  #isSuccess = false;
  #message = '';
  #data = [];

  constructor(status, isSuccess = false, message = '', data = []) {
    this.#status = status;
    this.#isSuccess = isSuccess;
    this.#message = message;
    this.#data = data;
  }

  getResponse() {
    const response = {
      status: this.#status,
      isSuccess: this.#isSuccess,
      message: this.#message,
      data: this.#data,
    };

    return response;
  }
}

module.exports = Response;
