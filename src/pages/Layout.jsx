
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../Context/AppContext.jsx';

export default function Layout() {
    const { token, user, setToken, setUser } = useContext(AppContext);

    async function handlerLogout(e) {
        e.preventDefault();
        const res = await fetch('/api/logout', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (res.ok) {

            console.log("Logout successfully");
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            window.location.href = "/login";
        } else {
            console.log("Logout failed");
        }

    }
    return (
        <>
            <header>
                <nav>

                <Link to="/" className="nav-link">Home</Link>
                    {user ? (
                        <div className="flex items-center space-x-2">
                            <span><p className=" text-slate-400 text-xs">Welcome, {user.name}</p></span>
                            <form onSubmit={handlerLogout} className='inline'>
                                <button className='nav-link'>Logout</button>
                            </form>
                             <Link to="/create" className='nav-link'>Create Post</Link>
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
