import {TodoItem} from '../interfaces';
import {List, Typography} from '@material-ui/core';
import {TodoItemComponent} from './TodoItemComponent';
import React from 'react';

interface TodoItemListProps {
  todoItems: TodoItem[];
  onDelete: (item: TodoItem) => void;
}

export const TodoItemList: React.FC<TodoItemListProps> = ({todoItems, onDelete}) => {
  if (todoItems.length === 0) {
    return null;
  }
  return (
    <>
      <Typography variant="h6">This is what you should do</Typography>
      <List>
        {todoItems.map(item => <TodoItemComponent key={item._id} item={item}
                                                        deleteClicked={() => onDelete(item)}/>)}
      </List>
    </>
  );
};
