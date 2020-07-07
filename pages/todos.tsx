import Layout from '../components/Layout';
import React, {useState} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {TodoItem} from '../interfaces';
import {TodoItemComponent} from '../components/TodoItemComponent';

interface TodoPageProps {
  items: TodoItem[];
}

const TodosPage: NextPage<TodoPageProps> = ({items}) => {
  const refresh = async () => fetchTodosFromApi().then(setTodos);
  const onDelete = async (item: TodoItem) => deleteTodoByApi(item).then(refresh);
  const onCreate = (title: string) => createTodoByApi(title).then(refresh);

  const [todos, setTodos] = useState(items);

  const [title, setTitle] = useState('');

  return (
    <Layout title="Todos">
      <h1>Here's what you should do</h1>
      <input value={title} onChange={(event => setTitle(event.target.value))}/>
      <button onClick={() => onCreate(title)}>Create New</button>
      <ul>
        {todos.map(item => <TodoItemComponent item={item} deleteClicked={onDelete}/>)}
      </ul>
    </Layout>
  );
};

export default TodosPage;

const createTodoByApi = (title: string) => {
  return fetch('http://localhost:3000/api/todos',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title})
    });
};

const fetchTodosFromApi = (): Promise<TodoItem[]> =>
  fetch('http://localhost:3000/api/todos').then(response => response.json());

const deleteTodoByApi = (item: TodoItem): Promise<void> =>
  fetch(`http://localhost:3000/api/todos/${item._id}`, {method: 'DELETE'}).then();

export const getServerSideProps: GetServerSideProps<TodoPageProps> = async () => {
  const items = await fetchTodosFromApi();
  return ({props: {items}});
};
