import React from 'react'

function Post(props) {
  const post = props.post
  return <div>
    <h2>{post.fields.title}</h2>
    <h3>{post.fields.author} - {post.fields.created_at}</h3>
    <p>{post.fields.text}</p>
  </div>
}

export default Post