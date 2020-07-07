import {TodoItem} from '../../interfaces';

const baseUrl = `${process.env.NEXT_PUBLIC_HOST}/api/todos`;

export const createTodo = (title: string): Promise<string> =>
  fetch(baseUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    }).then(response => response.headers.get('Location') || '');

export const readAllTodos = (): Promise<TodoItem[]> =>
  fetch(baseUrl).then(response => response.json());

export const deleteTodo = (item: TodoItem): Promise<void> =>
  fetch(`${baseUrl}/${item._id}`, {method: 'DELETE'}).then();
