import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import postApi from '../../api/post';
import { useEffect } from 'react';
import { useState } from 'react';
import HtmlParser from '../../components/postDetail/htmlParser';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  async function getPostDetail() {
    try {
      const response = await postApi.getById(id);
      setPost((prev) => prev = response);
    } catch (error) {
      window.alert(error.message);
    }
  }
  async function onClickDelete() {
    try { 
      await postApi.delete(id);
      navigate('/', { replace: true });
    } catch (error) {
      window.alert(error.message);
    }
  }
  async function onClickUpdate() {
    navigate(`/post/update/${id}`, { state: { title: post.title, content: post.content} });
  }
  useEffect(() => {
    getPostDetail();
  }, [ id ]);
  if (!post) return;
  return (
    <div className='post_detail_view'>
      <header>
        <h3>{ post.title }</h3>
        {
          post.isOwner && 
          <div className='icon_wrap'>
            <span onClick={onClickUpdate}><HiOutlinePencil cursor='pointer' /></span>
            <span onClick={onClickDelete}><HiOutlineTrash cursor='pointer' /></span>
          </div>
        }
      </header>
      <main>
        <section>
          <p>작성자 {post.name}</p>
          <p>{new Date(post.created_on).toLocaleString()}</p>
        </section>
        <HtmlParser content={post.content} />
      </main>
    </div>
  )
}