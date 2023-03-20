export const getOneBook = async (req, res) => {
  // console.log(req.headers);
  res.send({ message: req.user });
};

export const createOneBook = (req, res) => {
  console.log(req.headers);
  res.send({ message: 'success' });
};
