import React from 'react'
import UpdatePost from "./UpdatePost"
import axios from "axios"

function Post(props) {
  const post = props.post

  const deletePost = async () => {
    const data = await axios.delete(`https://api.airtable.com/v0/appFhr7txjsns0HMI/Table%201/${post.id}`, {
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_KEY}`
      }
    })
    props.updateFetchBlogPosts(!props.fetchBlogPosts)
  }

  return <div>
    <h2>{post.fields.title}</h2>
    <h3>{post.fields.author} - {post.fields.created_at}</h3>
    <p>{post.fields.text}</p>
    <UpdatePost post={post} fetchBlogPosts={props.fetchBlogPosts} updateFetchBlogPosts={props.updateFetchBlogPosts} />
    <button onClick={deletePost}>delete</button>
  </div>
}

export default Post