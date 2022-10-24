import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaRegUserCircle, FaCode } from 'react-icons/fa';
import { removeToken } from '../../utils/localStorage';
import './navbar.css';
import { AppContext } from "../../App";

export default function Navbar() {
  const { isLogin, updateIsLogin } = useContext(AppContext);
  function logout() {
    removeToken();
    updateIsLogin(false);
  }
  return (
    <nav className="navbar">
      <h1>
        <Link to='/'>
          <FaCode color="#eeeeee" />
          <span>B-coding</span>
        </Link>
      </h1>
      {
        isLogin
        ? <div className="logout_text" onClick={logout}>
            <FaRegUserCircle />
            로그아웃
          </div>
        : <div className="menu_list">
            <Link to='/login' >로그인</Link>
            <Link to='/register' >회원가입</Link>
          </div>
      }
    </nav>
  )
}