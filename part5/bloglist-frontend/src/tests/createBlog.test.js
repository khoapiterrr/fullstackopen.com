import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlog from '../components/CreateBlog';
describe('Test <CreateBlog/>', () => {
  test('Create blog', () => {
    const createBlog = jest.fn();

    const component = render(<CreateBlog onCreateBlog={createBlog} />);

    const titleInput = component.container.querySelector('input[name="title"]');
    const authorInput = component.container.querySelector(
      'input[name="author"]',
    );
    const urlInput = component.container.querySelector('input[name="url"]');

    const form = component.container.querySelector('#createBlogForm');

    fireEvent.change(titleInput, {
      target: { value: 'fullstack part 5' },
    });
    fireEvent.change(authorInput, {
      target: { value: 'fullstack' },
    });
    fireEvent.change(urlInput, {
      target: { value: 'url' },
    });

    fireEvent.submit(form);
    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0]).toEqual({
      author: 'fullstack',
      title: 'fullstack part 5',
      url: 'url',
    });
  });
});
