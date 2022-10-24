import './style.css';
import PostList from '../../components/home/postList';
import { useEffect, useContext } from 'react';
import postApi from '../../api/post';
import { useState } from 'react';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { isLogin } = useContext(AppContext);
  async function getAllPost() {
    try {
      const posts = await postApi.getAll();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div className="home_view">
      <header>
        <h2>게시판</h2>
        {
          isLogin && <Link to='/post'>글쓰기</Link>
        }
      </header>
      <PostList posts={posts} />
    </div>
  )
}