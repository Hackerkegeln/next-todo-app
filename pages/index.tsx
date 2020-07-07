import Layout from '../components/Layout';
import React, {useState} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {TodoItem} from '../interfaces';
import {CreateNewTodo} from '../components/CreateNewTodo';
import {TodoItemList} from '../components/TodoItemList';
import {WithStyles, withStyles} from '@material-ui/core';
import {styles} from '../theme';

interface TodoPageProps {
  items: TodoItem[];
}

const TodosPage: NextPage<TodoPageProps & WithStyles> = ({items, classes}) => {
  const refresh = async () => fetchTodosFromApi().then(setTodos);
  const onDelete = async (item: TodoItem) => deleteTodoByApi(item).then(refresh);
  const onCreate = async (title: string) => {
    await createTodoByApi(title);
    await refresh();
  };
  const [todos, setTodos] = useState(items);

  return (
    <Layout title="Todos">
      <div className={classes.root}>
        <CreateNewTodo onCreate={onCreate}/>
        <TodoItemList todoItems={todos} onDelete={onDelete}/>
      </div>
    </Layout>
  );
};

// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(TodosPage);

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

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<TodoPageProps> = async () => {
  const items = await fetchTodosFromApi();
  return ({props: {items}});
};
