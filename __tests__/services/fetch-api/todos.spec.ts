import {readAllTodos} from '../../../services/fetch-api/todos';
beforeEach(() => {
  fetchMock.resetMocks();
  process.env.NEXT_PUBLIC_HOST = 'http://myhost.test';
});

test('read calls fetch api', async () => {
  fetchMock.mockResponseOnce('[]');

  await readAllTodos();

  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(fetchMock).toHaveBeenCalledWith('http://myhost.test/api/todos');
});

test('read returns fetch api response', async () => {
  // language=JSON
  const response = `[
    {
      "_id": "abcdef",
      "title": "My Todo Item"
    },
    {
      "_id": "ghijk",
      "title": "Another Item"
    }
  ]`;
  const expected = [
    {
      "_id": "abcdef",
      "title": "My Todo Item"
    },
    {
      "_id": "ghijk",
      "title": "Another Item"
    }
  ];
  fetchMock.mockResponseOnce(response);

  const result = await readAllTodos();

  expect(result).toEqual(expected);
});
