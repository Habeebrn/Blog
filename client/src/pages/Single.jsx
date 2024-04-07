import React, { useContext, useEffect, useState } from 'react'
import edit from "../images/edit.png"
import delette from "../images/delete.png"
import { Link, useLocation, useNavigate } from 'react-router-dom' 
//use location for show component path on URL
import { Menu } from '../Components/Menu'
import axios from "axios"
import moment from "moment"
import { AuthContext } from '../context/AuthContexProvider'
//show the difference between post date and current date
// import DOMPurify from "dompurify";

export const Single = () => {

  const [ post, setPost ] = useState ({})

  const location = useLocation()
  const navigate = useNavigate()



  const postId = location.pathname.split("/")[2]

  const {currentUser} = useContext(AuthContext)

  // console.log(postId)

  useEffect (()=> {

    const fetchData = async ()=> {
      try {
        
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
        console.log(post)

      } catch (error) {
        console.log(error)
      }
    };

    fetchData();

      
    },[postId]);

    const handleDelete = async () => {
      try {
        
        await axios.delete(`/posts/${postId}`)
        navigate("/")
        

      } catch (error) {
        console.log(error)
      }
    }
       
    
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../../public/upload/${post?.img}`} alt="" />
        <div className="user">
         { post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && <div className="edit">
              <Link to={"/write?edit=2"} state={post}>
              <img src={edit} alt="" />
              </Link>

              <img onClick={handleDelete} src={delette} alt="" />
            </div>}
        </div>
        <h1>{post.title}</h1>
        {/* <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.desc), }}> </p>  */}
     {post.desc}
      </div>
      <div >
          <Menu cat={post.cat}/>
      </div>
    </div>
  )
}
