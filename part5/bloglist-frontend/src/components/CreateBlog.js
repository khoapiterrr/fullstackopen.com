import React from 'react';
import PropTypes from 'prop-types';

function CreateBlog({ onCreateBlog }) {
  const [value, setValue] = React.useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    onCreateBlog(value, clearForm);
  };
  const clearForm = () => {
    setValue({
      author: '',
      title: '',
      url: '',
    });
  };
  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return (
    <form id='createBlogForm' onSubmit={onSubmit}>
      <h2>Create new</h2>
      <div>
        <label htmlFor='title'>title : </label>
        <input type='text' name='title' value={value.title} onChange={onChange} />
      </div>
      <div>
        <label htmlFor='author'>author : </label>
        <input type='text' name='author'value={value.author} onChange={onChange} />
      </div>
      <div>
        <label htmlFor='url'>url : </label>
        <input type='text' name='url'value={value.url} onChange={onChange} />
      </div>
      <button type='submit'>Create</button>
    </form>
  );
}

CreateBlog.propTypes = {
  onCreateBlog: PropTypes.func.isRequired,
};

export default CreateBlog;
