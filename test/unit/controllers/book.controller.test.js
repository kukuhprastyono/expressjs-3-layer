import { getOneBook } from '../../../src/controllers/book.contoller';

describe('getOneBook', () => {
  const req = {
    user: {
      name: 'user',
    },
  };
  const res = {
    send: (data) => data,
  };
  it('should return response', async () => {
    const getOneBookTest = await getOneBook(req, res);
    console.log(getOneBookTest);
    expect(getOneBookTest).toEqual({
      message: req.user,
    });
  });
});
