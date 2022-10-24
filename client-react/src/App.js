import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Page
import Home from './views/home';
import Login from './views/login';
import Register from './views/register';
import PostCreate from './views/postCreate';
import PostDetail from './views/postDetail';
import PostUpdate from './views/postUpdate';
// Navbar
import Navbar from './components/base/navbar';
import { getToken } from './utils/localStorage';

export const AppContext = createContext(null);

function App() {
  const [isLogin ,setIsLogin] = useState(getToken() ? true : false);
  function updateIsLogin(_isLogin) {
    setIsLogin(_isLogin);
  }
  const value = {
    isLogin,
    updateIsLogin,
  };
  return (
    <AppContext.Provider value={value}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post' element={<PostCreate />} />
          <Route path='/post/:id' element={<PostDetail />} />
          <Route path='/post/update/:id' element={<PostUpdate />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
