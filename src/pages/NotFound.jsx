import {Link} from "react-router-dom";

export default function NotFound() {
    return (
        <section className="card empty-state">
            <p className="eyebrow">ERROR 404</p>
            <h1>Looks like this path is off the map.</h1>
            <p>The page you requested could not be found.</p>
            <Link to="/" className="button">Back to skillforge</Link>
        </section>
    );
}