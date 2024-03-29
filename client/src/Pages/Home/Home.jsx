import "./Home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import BlogNavbar from "../components/Navbar/BlogNavbar";
import Posts from "../components/Posts/Posts";

function Home() {
  const [posts, getPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://timetogeek.onrender.com/api/posts");
      const postData = res.data;
      getPosts(postData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <BlogNavbar></BlogNavbar>
      <Posts posts={posts}></Posts>
    </div>
  );
}

export default Home;
