import { useRef } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { MdLabelOutline } from 'react-icons/md';
import authApi from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/layout';

export default function Login() {
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  function updateId({ target }) {
    idRef.current.value = target.value;
  }
  function updatePassword({ target }) {
    passwordRef.current.value = target.value
  }
  function updateName({ target }) {
    nameRef.current.value = target.value;
  }
  async function register() {
    if (
      !idRef.current.value || 
      !passwordRef.current.value ||
      !nameRef.current.value
    ) {
      return;
    }
    try {
      await authApi.register({ id: idRef.current.value, password: passwordRef.current.value, name: nameRef.current.value });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  }
  function onKeyup({ keyCode }) {
    if (keyCode === 13) {
      register();
    }
  }

  return (
    <AuthLayout 
      forms={[
        function IdFrom() {
          return (
            <>
              <p>
                <AiOutlineUser />
                아이디
              </p>
              <input type='text' ref={idRef} onChange={updateId} onKeyUp={onKeyup} />
            </>
          )
        },
        function NameFrom() {
          return (
            <>
              <p>
                <MdLabelOutline />
                이름
              </p>
              <input type='text' ref={nameRef} onChange={updateName} onKeyUp={onKeyup} />
            </>
          )
        },
        function PasswordForm() {
          return (
            <>
              <p>
                <AiOutlineLock />
                비밀번호
              </p>
              <input type='password' ref={passwordRef} onChange={updatePassword} onKeyUp={onKeyup} />
            </>
          )
        }
      ]}
      Button={function ButtonForm() {
        return <button onClick={register}>회원가입</button>
      }}
    />
  )
}