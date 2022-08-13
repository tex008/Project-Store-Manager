// conhecimento adquirido durante mentoria summer de instrução 11/08 - Luá

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = NotFoundError;