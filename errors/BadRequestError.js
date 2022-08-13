// conhecimento adquirido durante mentoria summer de instrução 11/08 - Luá

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = BadRequestError;