module.exports = (req, res) => {
  res.status(404).json({
    error: 'Error 404'
  });
};
