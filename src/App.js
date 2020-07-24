import React, { useEffect, useState } from 'react';
import axios from 'axios'

import Post from "./Post"

function App() {
  const [blogPosts, updateBlogPosts] = useState([])

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
  }, [])

  return (
    <main>
      <h1>My Blog</h1>
      {blogPosts.map(post => <Post post={post} key={post.id} />)}
    </main>);
}

export default App;
