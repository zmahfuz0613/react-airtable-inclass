import React, { useEffect, useState } from 'react';
import axios from 'axios'

import Post from "./Post"
import CreatePost from "./CreatePost"

function App() {
  const [blogPosts, updateBlogPosts] = useState([])
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

  return (
    <main>
      <h1>My Blog</h1>
      <CreatePost 
        updateFetchBlogPosts={updateFetchBlogPosts} 
        fetchBlogPosts={fetchBlogPosts}
      />
      {blogPosts.map(post => <Post post={post} key={post.id} />)}
    </main>
  );
}

export default App;
