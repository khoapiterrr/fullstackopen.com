import React from 'react';
import PropTypes from 'prop-types';
const Blog = ({ blog, onLikeBlog, onRemoveBlog }) => {
  const [visible, setVisible] = React.useState(false);

  const toggleVisibility = () => setVisible(!visible);
  return (
    <div className='blog-item'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            Likes {blog.likes}
            <button onClick={() => onLikeBlog(blog)}>Like</button>
          </p>
          {blog.user && <p>{blog.user.name}</p>}
          <button onClick={() => onRemoveBlog(blog)}>Remove</button>
        </div>
      )}
    </div>
  );
};
Blog.propTypes = {
  blog: PropTypes.any.isRequired,
  onRemoveBlog: PropTypes.func.isRequired,
  onLikeBlog: PropTypes.func.isRequired,
};

export default Blog;
