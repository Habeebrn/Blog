import React, { useState } from 'react'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import moment from 'moment'



export const Write = () => {

  const state = useLocation().state

  const [ value, setValue] = useState ( state?.title || "");
  const [ title, setTitle ] = useState (state?.desc || "");
  const [ file, setFile ] = useState(null);
  const [ cat, setCat ] = useState(state?.cat || "");

  const navigate = useNavigate()



   const upload = async () => {

      try {

        const formData = new FormData()
        formData.append("file", file)
        const res = await axios.post("/upload", formData)
        console.log("this is res",res.data)

      } catch (error) {
        console.log(error)
      }
   }


   const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
          navigate("/")
    } catch (err) {
      console.log(err);
    }
  };
  

  // console.log(value)


  return (

    <div className='add'>

      <div className="content">

        <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />

        </div>
      
      </div>
      <div className="menu">
        <div className="item">  
          <h1>Publish</h1>
          <span>
            <b>Status : <br /> Draft</b>
          </span>
          <span>
            <b>Visibility : <br /> Public </b>
          </span>
          <input style={{display:"none"}} type="file" id='file' onChange={e => setFile(e.target.files[0])} name='' />
          <label className='file' style={{cursor: "pointer"}}  htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button >Save as draft</button>
            <button onClick={handleClick} > Publish </button>
          </div>
        </div>

        <div className="item">
          <h1>Catogory</h1>
        <div className="cat">
        <input type="radio" checked={cat === "art"} name='cat' id='art' value="art" onChange={e => setCat(e.target.value)} />
        <label htmlFor="art">Art</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat === "science"} name='cat' id='science' value="science" onChange={e => setCat(e.target.value)} />
        <label htmlFor="science">Science</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat === "technology"} name='cat' id='technology' value="technology" onChange={e => setCat(e.target.value)} />
        <label htmlFor="technology">Technology</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat === "cinima"} name='cat' id='cinima' value="cinima" onChange={e => setCat(e.target.value)} />
        <label htmlFor="cinima">Cinima</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat === "design"} name='cat' id='design' value="design" onChange={e => setCat(e.target.value)} />
        <label htmlFor="design">Design</label>
        </div>
        <div className="cat">
        <input type="radio" checked={cat === "food"} name='cat' id='food' value="food" onChange={e => setCat(e.target.value)} />
        <label htmlFor="food">Food</label>
        </div>
          
        </div>
      </div>
      
    </div>
  )
}
