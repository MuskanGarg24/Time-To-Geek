import './Home.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogNavbar from '../components/Navbar/BlogNavbar'
import Posts from '../components/Posts/Posts'
import Footer from '../components/Footer/Footer'

function Home () {
  const [posts, getPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/posts')
      const postData = res.data
      getPosts(postData)
    }
    fetchData()
  }, [])

  return (
    <div>
      <BlogNavbar></BlogNavbar>
      <Posts posts={posts}></Posts>
      <Footer></Footer>
    </div>
  )
}

export default Home;
