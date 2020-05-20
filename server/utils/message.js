module.exports.generateMessage = function (from, text) {
  return {
    from,
    text,
    createAt: new Date().getTime(),
  };
};
