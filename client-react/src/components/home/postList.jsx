import './postList.css';
import { useNavigate } from 'react-router-dom';

export default function PostList({ posts }) {
  const navigate = useNavigate();
  function sliceTitle(title) {
    return title.length < 20 ? title : title.slice(0, 20);
  }
  function pushPostDetail(_id) {
    navigate(`/post/${_id}`);
  }
  return (
    <table>
      <thead>
        <tr>
          <th>작성자</th>
          <th>제목</th>
          <th>등록일</th>
        </tr>
      </thead>
      <tbody>
        {
          posts.map((post) => (
            <tr key={post.id} onClick={() => pushPostDetail(post.id)}>
              <td>{post.name}</td>
              <td>{sliceTitle(post.title)}</td>
              <td>{post.created_on.slice(0, 10)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}