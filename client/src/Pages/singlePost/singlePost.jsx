import "./singlePost.css";
import BlogNavbar from "../components/Navbar/BlogNavbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Card from "react-bootstrap/Card";

function SinglePost() {
  const [post, setPost] = useState({});
  const path = useLocation();
  const id = path.pathname.split("/")[2];
  const { user } = useContext(Context);
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        "https://timetogeek.onrender.com/api/posts/" + id
      );
      const singlePostData = res.data;
      setPost(singlePostData);
      setTitle(res.data.title);
      setContent(res.data.content);
    };
    fetchData();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      window.location.replace("/");
      await axios.delete(
        `https://timetogeek.onrender.com/api/posts/${post._id}`,
        {
          data: { username: user.username },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setUpdate(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://timetogeek.onrender.com/api/posts/${post._id}`, {
        username: user.username,
        title: Title,
        content: Content,
      });
      window.location.reload();
      console.log("Post updated successfully");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <BlogNavbar></BlogNavbar>
      <Card className="singlePost">
        <Card.Body>
          <div className="postDetails">
            <p className="date">{new Date(post.createdAt).toDateString()}</p>
            <p className="author">
              Author -
              <Link to={`/?user=${post.username}`} className="link">
                <span className="username">{post.username}</span>
              </Link>
            </p>
          </div>
          <div className="postTitle">
            {update ? (
              <input
                type="text"
                value={Title}
                onChange={handleTitleChange}
                className="titleInput"
                placeholder="Update Title..."
              ></input>
            ) : (
              <h1 className="title">{post.title}</h1>
            )}
          </div>
          <div className="postContent">
            {update ? (
              <textarea
                value={Content}
                onChange={handleContentChange}
                className="storyInput"
                rows="10"
                placeholder="Update Description..."
              ></textarea>
            ) : (
              <p className="content">{post.content}</p>
            )}
          </div>
          <div className="buttons">
            {post.username === user.username && (
              <>
                <button className="controlButton edit" onClick={handleEdit}>
                  Edit
                </button>
                <button className="controlButton delete" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
            {update && (
              <button className="controlButton update" onClick={handleUpdate}>
                Update
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default SinglePost;
