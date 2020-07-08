import {render, within} from '@testing-library/react';
import TodosPage from '../../pages';
import {TodoItem} from '../../interfaces';
import React from 'react';

test('render should work', async () => {
  const items: TodoItem[] = [
    {_id: 'abcdef', title: 'Work'},
    {_id: 'ghijkl', title: 'Drink'},
  ];

  const {container} = render(<TodosPage items={items}/>);

  expect(container).toMatchSnapshot();
});

test('has list of todos', async () => {
  const items: TodoItem[] = [
    {_id: 'abcdef', title: 'Work'},
    {_id: 'ghijkl', title: 'Drink'},
  ];

  const {getByRole} = render(<TodosPage items={items}/>);

  const list = getByRole('list');
  expect(list).toBeInTheDocument();
  const listElements = within(list).getAllByRole('listitem');
  expect(listElements).toHaveLength(2);
  expect(listElements[0]).toHaveTextContent('Work');
  expect(listElements[1]).toHaveTextContent('Drink');
});

test('allows creation of new todos', () => {
  const {getByRole} = render(<TodosPage items={[]}/>);

  expect(getByRole('button')).toHaveTextContent('Create New');
});
