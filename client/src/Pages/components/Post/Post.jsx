import './Post.css'
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";

function Post ({post}) {

  return (
    <Card className="text-center cardBody">
      <Card.Body className="card">
      <Link to={`/post/${post._id}`} className='link'>
        <Card.Title><h1 className="cardtitle">{post.title}</h1></Card.Title>
        </Link>
        <Card.Text><p className="cardcontent">
        {post.content}
        </p>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Post;
