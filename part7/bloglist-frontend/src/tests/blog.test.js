import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../components/Blog';
// import { prettyDOM } from '@testing-library/dom';

describe('Test render component blog', () => {
  const blogItem = {
    author: 'Messi',
    id: '6129bea174a03173dccb316b',
    likes: 0,
    title: 'Dev ReactJs',
    url: '1',
    user: {
      username: 'khoapiterrr',
      name: 'trọng khoa',
      id: '6128a6dfe800ef1750bf0037',
    },
  };
  test('render content', () => {
    const handleLikeBtn = jest.fn();
    const handleRemoveBlog = jest.fn((value) => console.log(value));

    const component = render(
      <Blog
        blog={blogItem}
        onLikeBlog={handleLikeBtn}
        onRemoveBlog={handleRemoveBlog}
      />,
    );

    expect(component.container).toHaveTextContent('Dev ReactJs Messi');
    // const toggleVisibility = jest.fn();

    const button = component.getByText('View');
    fireEvent.click(button);

    const likesBtn = component.getByText('Like');
    fireEvent.click(likesBtn);
    fireEvent.click(likesBtn);

    expect(handleLikeBtn.mock.calls).toHaveLength(2);
  });
});
