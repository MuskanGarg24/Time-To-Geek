import Post from "../Post/Post";

function Posts (props) {

  const displayPosts = props => {
    const { posts } = props
    const length = posts.length


    if (length > 0) {
      return posts.map(post => {
        return (
          <div>
            <Post post={post}></Post>
          </div>
        )
      })
    } else {
      return <h3 className='mt-5'>No Post Here</h3>
    }
  }
  return <div>{displayPosts(props)}</div>
}

export default Posts;
