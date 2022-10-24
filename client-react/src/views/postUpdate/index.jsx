import { useRef, useEffect } from "react";
import Editor from "../../components/postCreate/Editor";
import './style.css';
import Button from "../../components/common/button";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import postApi from '../../api/post';

export default function PostCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: { content, title } } = useLocation();
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  function onChangeContentValue(value) {
    contentRef.current.value = value;
  }
  function updateTitle({ target }) {
    titleRef.current.value = target.value;
  }
  function onClickCancle() {
    navigate(`/post/${id}`);
  }
  async function onClickSave() {
    if (!contentRef.current.value || !titleRef.current.value) {
      return;
    }
    try {
      await postApi.update({ id, title: titleRef.current.value, content: contentRef.current.value });
      navigate(`/post/${id}`);
    } catch (error) {
      window.alert(error.message);
    }
  }
  useEffect(() => {
    titleRef.current.value = title;
    contentRef.current.value = content;
  }, [ title, content ]);
  return (
    <div className='post_create_view'>
      <div className="post_form">
        <h3>제목</h3>
        <input type="text" ref={titleRef} onChange={updateTitle} />
      </div>
      <div className="post_form">
        <h3>본문</h3>
        <Editor value={contentRef} onChange={onChangeContentValue} />
      </div>
      <div className="btn_wrap">
        <Button onClick={onClickCancle} line={true}>취소</Button>
        <Button onClick={onClickSave} line={true}>저장</Button>
      </div>
    </div>
  );
}