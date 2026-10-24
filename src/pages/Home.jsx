import { Link } from "react-router-dom";

export default function Home ({profile}) {
    const hasProfile = Boolean(profile.name);

    return (
        <section>
            <div className="hero">
                <p className="eyebrow">Your Career Stats Here</p>
                <h1>Turn your skills into opportunities</h1>
                <p>
                    Build a career profile that brings education , technical skills and projects together
                </p>

                <Link to="/create" className="button">
                {hasProfile ? "Update Profile":"Create Profile"}
                </Link>
            </div>

            <div className="stats-grid">
                <article className="card">
                    <p className="muted">Profile</p>
                    <h2>{hasProfile ? "Created":"Not Created"}</h2>
                    <p>Keep your professional details updated.</p>
                </article>

                <article className="card">
                    <p className="muted">Technical skills</p>
                    <h2>{profile.skills.length}</h2>
                    <p>Skills listed in your profile.</p>
                </article>

                <article className="card">
                    <p className="muted">Projects</p>
                    <h2>{profile.projects.length}</h2>
                    <p>Projects demostrating your experience</p>
                </article>
            </div>

            <div className="card">
                <h2>Build your career profile</h2>
                <p>
                    Start with your basic details , add your skills and showcase projects you have completed.
                </p>

                <div className="actions">
                    <Link to="/create" className="button">
                    Get Started </Link>

                    <Link to="/guide" className="button secondary">
                    Learn React Concepts
                    </Link>
                    

                </div>
            </div>
        </section>
    );
}