import React from 'react';
import {TodoItem} from '../interfaces';
import {Delete} from '@material-ui/icons';
import {IconButton, ListItem, ListItemSecondaryAction, ListItemText} from '@material-ui/core';

interface TodoItemComponentProps {
  key: string;
  item: TodoItem;
  deleteClicked: (item: TodoItem) => void;
}

export const TodoItemComponent: React.FC<TodoItemComponentProps> = ({item, deleteClicked, key}) => {
  const notifyDeleteClicked = () => deleteClicked(item);
  return (
    <ListItem key={key}>
      <ListItemText primary={item.title}/>
      <ListItemSecondaryAction >
        <IconButton edge="end"
                    onClick={notifyDeleteClicked}
                    aria-label="delete">
          <Delete/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
