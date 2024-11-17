import axios from 'axios';
import React, { useState } from 'react'

const AddArticle = () => {
    if(!localStorage.getItem('isLoggedIn')){
        window.location.href = '/login'
    }
    const user=localStorage.getItem('user')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState(JSON.parse(user).username);
    const [image, setImage] = useState(null);
  
    const handlePostSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('author', author);
      formData.append('image', image); 
      axios.post('http://localhost:5000/api/posts', formData)
        .then(response => {
          alert('Post created successfully!');
          setTitle('');
          setContent('');
          setAuthor('');
          setImage(null);
          window.location.href = '/'

        })
        .catch(error => alert('Error creating post'));
    };
  
    return (
      <div>
        <h1 className="text-2xl font-bold">Create Post</h1>
        <form onSubmit={handlePostSubmit} className="mt-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 w-full"
              
            />
          </div>
          <div className="mt-2">
            <label className="block mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 w-full"
              
            />
          </div>
         
          <div className="mt-2">
            <label className="block mb-1">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="border p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
            Submit
          </button>
        </form>
      </div>
    );
  };
  
export default AddArticle

