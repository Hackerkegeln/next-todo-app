import React from 'react';
import {TodoItem} from '../interfaces';

interface TodoItemComponentProps {
  item: TodoItem;
  deleteClicked: (item: TodoItem) => void;
}

export const TodoItemComponent: React.FC<TodoItemComponentProps> = ({item, deleteClicked}) => {
  const notifyDeleteClicked = () => deleteClicked(item);
  return (
    <li>{item.title}
      <button onClick={notifyDeleteClicked}>Delete</button>
    </li>
  );
};
