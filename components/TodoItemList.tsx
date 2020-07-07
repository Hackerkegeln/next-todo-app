import {TodoItem} from '../interfaces';
import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core';
import React from 'react';
import {Delete} from '@material-ui/icons';
import {styles} from '../theme';

interface TodoItemListProps extends WithStyles<typeof styles> {
  todoItems: TodoItem[];
  onDelete: (item: TodoItem) => void;
}

interface TodoItemComponentProps {
  item: TodoItem;
  deleteClicked: (item: TodoItem) => void;
}

const TodoItemComponent: React.FC<TodoItemComponentProps> = ({item, deleteClicked}) => {
  const notifyDeleteClicked = () => deleteClicked(item);
  return (
    <ListItem>
      <ListItemText primary={item.title}/>
      <ListItemSecondaryAction>
        <IconButton edge="end"
                    onClick={notifyDeleteClicked}
                    aria-label="delete">
          <Delete/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const TodoItemList: React.FC<TodoItemListProps> = ({todoItems, onDelete, classes}) => {
  if (todoItems.length === 0) {
    return null;
  }
  return (
    <div className={classes.todoList}>
      <Typography variant="h6">This is what you should do</Typography>
      <List>
        {todoItems.map(item => <TodoItemComponent key={item._id} item={item} deleteClicked={() => onDelete(item)}/>)}
      </List>
    </div>
  );
};

// noinspection JSUnusedGlobalSymbols
export default withStyles(styles)(TodoItemList);
