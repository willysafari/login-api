
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext.jsx';
import AppProvider from './Context/AppProvider.jsx';
import Create from './pages/Posts/Create.jsx';
import Show from './pages/Posts/Show.jsx';
import Update from './pages/Posts/Update.jsx';

function App() {
  const { user } = useContext(AppContext);

  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/login' element={user ? <Home /> : <Login />} />
              <Route path='/register' element={user ? <Home /> : <Register />} />
              <Route path='/create' element={user ? <Create /> : <Login />} />
              <Route path='/posts/update/:id' element={user ? <Update /> : <Login />} />
              <Route path='/posts/:id' element={<Show/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>

    </>
  )
}

export default App
