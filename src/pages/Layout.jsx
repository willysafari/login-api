
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../Context/AppContext.jsx';

export default function Layout() {
    const {user} = useContext(AppContext);
    return (
        <>
            <header>
                <nav>

                    <Link to="/" className="nav-link">Home</Link>
                    {user ? (
                        <div className="space-x-2">
                               <span><p className=" text-slate-400 text-xs">Welcome, {user.name}</p></span>
                            <Link to="/logout" className='nav-link'>Logout</Link>
                        </div>
                     
                    ) :
                        <div className="space-x-2">
                            <Link to="/login" className='nav-link'>Login</Link>
                            <Link to="/register" className='nav-link'>Register</Link>
                        </div>
                    }
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>

    );
}
