import Layout from '../components/Layout';
import React, {useState} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {TodoItem} from '../interfaces';
import CreateNewTodo from '../components/CreateNewTodo';
import {WithStyles, withStyles} from '@material-ui/core';
import {styles} from '../theme';
import {createTodo, deleteTodo, readAllTodos} from '../services/fetch-api/todos';
import TodoItemList from '../components/TodoItemList';

interface TodoPageProps {
  items: TodoItem[];
}

const TodosPage: NextPage<TodoPageProps & WithStyles<typeof styles>> = ({items, classes}) => {
  const refresh = async () => readAllTodos().then(setTodos);
  const onDelete = async (item: TodoItem) => deleteTodo(item).then(refresh);
  const onCreate = async (title: string) => {
    await createTodo(title);
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

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSideProps<TodoPageProps> = async () => {
  const items = await readAllTodos();
  return ({props: {items}});
};
