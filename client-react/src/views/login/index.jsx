import { useRef, useContext } from 'react';
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import AuthLayout from '../../components/auth/layout';
import authApi from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../utils/localStorage';
import { AppContext } from '../../App';

export default function Login() {
  const { updateIsLogin } = useContext(AppContext);
  const idRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  function updateId({ target }) {
    idRef.current.value = target.value;
  }
  function updatePassword({ target }) {
    passwordRef.current.value = target.value
  }
  async function login() {
    if (
        !idRef.current.value || 
        !passwordRef.current.value
      ) {
      return;
    }
    try {
      const { token } = await authApi.login({ id: idRef.current.value, password: passwordRef.current.value });
      setToken(token);
      updateIsLogin(true);
      navigate('/');
    } catch (error) {
      window.alert(error.message);
    }
  }
  function onKeyup({ keyCode }) {
    if (keyCode === 13) {
      login();
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
        return <button onClick={login}>로그인</button>
      }}
    />
  )
}