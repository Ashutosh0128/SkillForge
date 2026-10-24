
import { NavLink, Outlet } from 'react-router-dom';

export default function Layout({ children }) {
    return (
        <div className="app-shell">
            <header className="Navbar">
                <NavLink to="/" className="brand">
                    SkillForge<span></span>
                </NavLink>

                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/create">Create Profile</NavLink>
                    <NavLink to="/preview">Preview</NavLink>
                    <NavLink to="/guide">Learning Guide</NavLink>
                </nav>
            </header>

            <main className="main-content">
                {children || <Outlet />}
            </main>

            <footer className="footer">
                SkillForge
            </footer>
        </div>
    );
}



/*import {NavLink, Outlet} from 'react-router-dom';

export default function Layout({children}) 
{
    return (
        <div className="app-shell">
            <header className= "Navbar">
                <Navlink to="/" className="brand">SkillForge<span></span>
                </Navlink>
                <nav>
                    <Navlink to="/">Home</Navlink>
                    <Navlink to="/create">Create Profile</Navlink>
                    <Navlink to="/preview">Preview </Navlink>
                    <Navlink to="/guide">Learning Guide</Navlink>
                </nav>
            </header>

            <main className="main-content">
                {children || <Outlet />}
            </main>

            <footer className="footer">
                SkillForge
            </footer>
        </div>
    );
} */
