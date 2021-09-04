import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import './app.css';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Togglable';

const App = () => {
  const blogFormRef = React.useRef();
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notify, setNotify] = useState({ error: false, message: '' });
  useEffect(() => {
    const infoUser = window.localStorage.getItem('infoUser');
    if (infoUser) {
      setUser(JSON.parse(infoUser));
    }
  }, []);
  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);
  const handleLogin = async (value) => {
    try {
      const response = await blogService.login(value);
      setUser(response);
      window.localStorage.setItem('infoUser', JSON.stringify(response));
    } catch (error) {
      setNotify({ error: true, message: error.response.data.error });
    } finally {
      setTimeout(() => setNotify({ error: false, message: '' }), 3000);
    }
  };
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('infoUser');
  };
  const handleLikeBlog = async (blog) => {
    try {
      console.log(blog);
      const objBlog = await blogService.likeBlog(blog);
      setBlogs(blogs.map((item) => (item.id === blog.id ? objBlog : item)));
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateBlog = async (data, clearForm) => {
    try {
      const newBlog = await blogService.createBlog(data);
      setNotify({
        error: false,
        message: `a new blog You're NOT gonna need it! by ${user.name}`,
      });
      setBlogs((old) => old.concat(newBlog));
      blogFormRef.current.toggleVisibility();
      if (clearForm) {
        console.log('clear');
        clearForm();
      }
    } catch (error) {
      setNotify({ error: true, message: error.response.data.error });
    } finally {
      setTimeout(() => setNotify({ error: false, message: '' }), 3000);
    }
  };

  const handleRemoveBlog = async (blog) => {
    if (window.confirm(`Remove blog You're NOT gonna by ${blog.user.name}`)) {
      try {
        await blogService.deleteBlog(blog);
        setBlogs(blogs.filter((x) => x.id !== blog.id));
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!user) {
    return (
      <>
        {notify.message && (
          <div className={notify.error ? 'error' : 'success'}>
            {notify.message}
          </div>
        )}
        <LoginForm onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {notify.message && (
        <div className={notify.error ? 'error' : 'success'}>
          {notify.message}
        </div>
      )}
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel={'Create new blog'} ref={blogFormRef}>
        <CreateBlog onCreateBlog={handleCreateBlog} />
      </Togglable>
      <br />
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            onLikeBlog={handleLikeBlog}
            onRemoveBlog={handleRemoveBlog}
          />
        ))}
    </div>
  );
};

export default App;
