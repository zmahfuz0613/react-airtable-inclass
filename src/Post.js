import React from 'react'
import UpdatePost from "./UpdatePost"

function Post(props) {
  const post = props.post
  return <div>
    <h2>{post.fields.title}</h2>
    <h3>{post.fields.author} - {post.fields.created_at}</h3>
    <p>{post.fields.text}</p>
    <UpdatePost post={post} fetchBlogPosts={props.fetchBlogPosts} updateFetchBlogPosts={props.updateFetchBlogPosts}/>
  </div>
}

export default Post