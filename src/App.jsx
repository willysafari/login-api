
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { useContext } from 'react';
import { AppContext } from './Context/AppContext.jsx';
import AppProvider from './Context/AppProvider.jsx';

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
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
     
    </>
  )
}

export default App
