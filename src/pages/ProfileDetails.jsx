import { Link, useParams} from "react-router-dom";

export default function ProfileDetails({profile}) {
    const {id} = useParams();

    if (!profile.name || profile.id !== id) {
        return (
            <section className="card empty-state">
                <h1>Profile not found</h1>
                <p>The requested profile does not exist in this application.</p>
                <Link to="/" className="button">Return home</Link>
            </section>
        );
    }

    return (
        <section className="card">
            <p className="eyebrow">PROFILE DETAILS</p>
            <h1>{profile.name}</h1>

            <p><strong>Profile ID:</strong>{id}</p>
            <p><strong>Email:</strong>{profile.email}</p>
            <p><strong>Education:</strong>{profile.education}</p>
            <p><strong>Course:</strong>{profile.course}</p>
            <p><strong>Career Goal:</strong>{profile.careerGoal || "Not Specified"}</p>

            <h2>Skills</h2>

            <ul>
                {profile.skills.map((skill) =>(
                    <li key = {skill.id}>
                        {skill.name} - {skill.level}
                    </li>
                ))}
            </ul>

            <h2>Projects</h2>
            {profile.projects.filter((p) => p.title.trim()).map((project) => (
                <article key={project.id}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </article>
            ))}

            <Link to="/preview" className="button">Back to preview</Link>
        </section>
    );
}