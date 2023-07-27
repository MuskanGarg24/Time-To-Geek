import "./write.css";
import BlogNavbar from "../components/Navbar/BlogNavbar";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/Context";
import Container from "react-bootstrap/Container";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
      username: user.username,
    };
    try {
      window.location.replace("/");
      await axios.post("https://timetogeek.onrender.com/api/posts", newPost);
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  return (
    <div>
      <BlogNavbar></BlogNavbar>
      <Container>
        <div className="createPost">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="writeTitle"
              placeholder="Title"
              onChange={handleTitle}
            ></input>
            <textarea
              className="writeDesc"
              cols="50"
              rows="5"
              placeholder="Description..."
              onChange={handleContent}
            ></textarea>
            <button type="submit" className="button">
              Create Post
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Write;
