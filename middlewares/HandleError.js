module.exports = (error, req, res, next) => {
  console.error(error);
  console.log(error.name);
  if (error.name === 'CastError') {
    res.status(400).json({
      error: 'Ha habido un error de cast'
    });
  } else {
    res.status(500).json({
      error: 'Ha habido un error inesperado'
    });
  }
};
