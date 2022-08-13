// conhecimento adquirido durante mentoria summer de instrução 11/08 - Luá

class UnprocessableError extends Error {
  constructor(message) {
    super(message);
    this.status = 422;
  }
}

module.exports = UnprocessableError;