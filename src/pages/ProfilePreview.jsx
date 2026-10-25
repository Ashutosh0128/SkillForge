import { Profiler, useMemo } from "react";
import { Link } from "react-router-dom";

export default function ProfilePreview({ profile }) {
    const completion = useMemo(() => {
        const checks = [
            Boolean(profile.name.trim()),
            Boolean(profile.email.trim()),
            Boolean(profile.phone.trim()),
            Boolean(profile.education.trim()),
            Boolean(profile.course.trim()),
            Boolean(profile.careerGoal.trim()),
            profile.skills.length > 0,
            profile.project.some((project) => project.title.trim())
        ];

        return Math.round(
            (checks.filter(Boolean).length / checks.length) * 100
        );
    }, [profile]);

    const skillSummary = useMemo(() => {
        return profile.skills.reduce((summary,skill) => {
            summary[skill.level] = (summary[skill.level] || 0)+ 1;
            return summary;
        }, {});
    }, [profile.skills]);

    if (!profile.name) {
        return (
            <section className="Card empty-state">
                <h1>No profile available</h1>
                <p>Create your career profile before previewing it.</p>
                <Link to="/create" className="button">
                    Create Profile
                </Link>
            </section>
        );
    }

    return (
        <section>
            <div className="page-heading">
                <p className="eyebrow"> YOUR PROFESSIONAL IDENTITY </p>
                <h1>Career profile preview</h1>
                <p className="muted">
                    preview the information you entered in SkilForage.
                </p>
            </div>

            <div className="profile-banner">
                <div className="avatar">
                    { profile.name.CharAt(0).toUpperCase()}
                </div>
                <div>
                    <h2>{profile.name}</h2>
                    <p>{profile.course}</p>
                    <p className="muted">{profile.careerGoal || "Career goal not added"}</p>
                </div>
            </div>

            <div className="card completion-card">
                <div className="section-heading">
                    <div>
                        <h2>Profile completion</h2>
                        <p className="muted">
                            Complete more sections to improve your profile.
                        </p>
                    </div>
                    <strong className="percentage">{completion}%</strong>
                </div>

                <div
                className="progress-track"
                role="progressbar"
                aria-label="Profile completion"
                aria-valuenow={completion}
                aria-valuemin={0}
                aria-valuemax={100}
                >
                    <div
                    className="progress-value"
                    style={{ width: `${completion}%` }}
                    />
                </div>
            </div>

            <div className="stats-grid">
                <article className="card">
                    <p className="muted">Education</p>
                    <h3>{profile.education}</h3>
                </article>

                <articale className="card">
                    <p className="muted">Skills</p>
                    <h3>{profile.skills.length}</h3>
                    <p>
                        {Object.entries(skillSummary)
                        .map(([level,count]) => `${level}: ${count}`)
                        .join(" . ")}
                    </p>
                </articale>
                
                <article className="card">
                    <p className="muted">Projects</p>
                    <h3>{profile.projects.filter((p) => p.title.trim()).length}</h3>
                </article>
            </div>

            <div className="card">
                    <h2>Contact Information</h2>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
            </div>

            <div className="card">
                <h2>Technical Skills</h2>
                {profile.skills.length === 0 ? (
                    <p className="muted">No skills added.</p>
                ) : (
                    <div className="tag-list">
                        {profile.skills.map((skill) => (
                            <span className="tag" key={skill.id}>
                                {skill.name} . {skill.level}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className="card">
                <h2>Project</h2>
                {profile.projcet.filter((p) => p.title.trim()).length === 0 ? (
                    <p className="muted">No Project Added Yet.</p>
                ) : (
                    profile.projects
                    .filter(( project) => project.title.trim())
                    .map((project) => (
                        <article className="project-card" key={project.id}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <p className="muted"> {project.tech}</p>
                        </article>
                    ))
                )}
            </div>

            <div className="actions">
                <Link to="/create" className="button">Edit Profile</Link>
                <Link to={`/profile/${profile.id}`} className="Button secondary">
                    Open Profile Details 
                </Link>
            </div>
        </section>
    );
}