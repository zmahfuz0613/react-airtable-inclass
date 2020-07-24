import React, { useEffect, useState } from 'react';
import axios from 'axios'

import Post from "./Post"

function App() {
  const [blogPosts, updateBlogPosts] = useState([])
  const [author, updateAuthor] = useState('')
  const [title, updateTitle] = useState('')
  const [text, updateText] = useState('')
  const [fetchBlogPosts, updateFetchBlogPosts] = useState(false)

  useEffect(() => {
    const apiCall = async () => {
      const posts = await axios.get("https://api.airtable.com/v0/appFhr7txjsns0HMI/Table%201?view=Grid%20view", {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
        }
      })
      updateBlogPosts(posts.data.records)
    }
    apiCall()
  }, [fetchBlogPosts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("https://api.airtable.com/v0/appFhr7txjsns0HMI/Table%201", {
      fields: {
        title: title,
        author: author,
        text: text
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    updateFetchBlogPosts(!fetchBlogPosts)
    updateAuthor('')
    updateText('')
    updateTitle('')
  }

  return (
    <main>
      <h1>My Blog</h1>
      {blogPosts.map(post => <Post post={post} key={post.id} />)}
      <h2>New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="author">Author</label>
        <input type="text" id="author" onChange={e => updateAuthor(e.target.value)} value={author} />
        <label htmlFor="title">Title</label>
        <input type="text" id="title" onChange={e => updateTitle(e.target.value)} value={title} />
        <label htmlFor="text">Text</label>
        <textarea name="text" id="text" cols="30" rows="10" onChange={e => updateText(e.target.value)} value={text}></textarea>
        <input type="submit" value="Create Post" />
      </form>
    </main>
  );
}

export default App;
