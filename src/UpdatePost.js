import React, { useState } from "react"
import axios from "axios"

function UpdatePost(props) {
  const [author, updateAuthor] = useState(props.post.fields.author)
  const [title, updateTitle] = useState(props.post.fields.title)
  const [text, updateText] = useState(props.post.fields.text)

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
    props.updateFetchBlogPosts(!props.fetchBlogPosts)
    updateAuthor('')
    updateText('')
    updateTitle('')
  }

  return <form onSubmit={handleSubmit}>
    <h2>Edit Blog Post</h2>
    <label htmlFor="author">Author</label>
    <input type="text" id="author" onChange={e => updateAuthor(e.target.value)} value={author} />
    <label htmlFor="title">Title</label>
    <input type="text" id="title" onChange={e => updateTitle(e.target.value)} value={title} />
    <label htmlFor="text">Text</label>
    <textarea name="text" id="text" cols="30" rows="10" onChange={e => updateText(e.target.value)} value={text}></textarea>
    <input type="submit" value="Create Post" />
  </form>

}

export default UpdatePost