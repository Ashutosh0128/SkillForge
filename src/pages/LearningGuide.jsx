const concept =[
    {
        title:"Controlled Forms",
        definition:
            "A controlled form input gets its value from react state . The onChange handler updated that state when the user types",
        use:
            "Use controlled inputs when you need to validate , transform , or react to field values.",
        example: '<input value={name} onChange={handleChange}/>'
    },
    {
        title:"Uncontrolled Forms",
        definition:
            "An uncontrolled input manages its current value in the DOM rather that React state.A ref lets you read the value when needed",
        use:
            "Useful wgen uou only need to read a value at a particular time,such as form submission.",
        example: "const inputRef = useRef(null); inputRef.current.value"
    },
    {
        title:"Form Validation",
        definition:
            "From validation checks whether user-entered data meets defined rules before it is accepted.",
        use:
            "prevent missing required values,invalid emails.malformed phone numbers, and duplicate skills.",
        example:'if (!name.trim())errors.name ="Name is required";'
    },
    {
        title:"Dynamic Forms",
        definition:
            "Dynamic forms render fields from data and allow users to add or remove entries while the application is running.",
        use:
            "Useful for skills,education records,certifications,work history,and projects,",
        example:"items.map(item => <input key={item.id} />)"
    },
    {
        title:"Custom Hooks",
        definition:
            "A custom Hook is a javascript function whose name starts with  use and which can use react hooks to share reusable stateful logic.",
        use:
            "The useLocalStorage Hook saves profile data and restores it when the app starts.",
        example: "const [profile, setProfile] = useLocalStorage(key,initialValue);"
    },
    {
        title:"useMemo",
        definition:
            "useMemo caches a calculated value between renders until one of its dependencies changes.",
        use:
            "SkillForge uses it to calculate profile completion and skill summaries.",
        example:"const total = useMemo(() => calculate(data),[data]);"
    },
    {
        title: "useState",
        definition:
            "useState adds a state variable to a component. Updating the state schedules a re-render.",
        use:
            "Store input values,errors, selected options, and dynamic form entries.",
        example: "const[name,setName] = useState('');"
    },
    {
        title: "useRef",
        definition:
            "useRef returns a persistent ref object. changing its current property does not trigger a re-render.",
        use:
            "Read the uncontrolled career-goal input when the form is submitted.",
        example: "const inputRef = useRef(null);"   
    },
    {
        title: "Props",
        definition:
            "Props are values passed from a parent component to a child component.",
        use:
            "App passes profile data and its update function to the profile form.",
        example: "<createProfile profile={profile} setProfile={setProfile} />"
    },
    {
        title:"React Router",
        definition:
            "React Router maps URL paths to components and supports navigation in a react application.",
        use:
            "SkillForge has Home create profile,preview,details,and 404 routes.",
        example: '<Route path="/preview" element={<ProfilePreview />} />'
    },
    {
        title:"Parametrized Rounting",
        definition:
            "A  paramiterzed route contains a dynamic segment in the URL,such as :id.",
        use:
            "Open a profile based on its identifier.",
        example: '<Route path="/profile/:id" element={<ProfileDetails />} />'
    },
    {
        title:"Conditional Rendering",
        definition:
            "Conditional rendering displays diffrent UI depending on a condition.",
        use:
            "Show a profile preview when one exists, or a message when no profile has been created.",
        example: '{profile.name ? <h1>{profile.name}</h1> : <p> No profile</p>}'
    },
    {
        title: "Lists and Keys",
        definition:
            "map() transforms array items into rendered elements. Key help react identify list items between updates.",
        use:
            "Display skill tags and project cards, and update the right item when entries change.",
        example: "skill.map(skill => <p key={ skill.id}>{skill.name}</p>)"
    }
];

export default function LearningGuide() {
    return (
        <section>
        <div className="page-heading">
            <p className="eyebrow">REACT REFERENCE</p>
            <h1>ALL Information</h1>
            <p className="muted">
                Definition,practical uses , and ecamples from SkillForge.
            </p>
        </div>

        <div className="guide-grid">
            {concept.map((concept) => (
                <article className="card-guide-card" key={concept.title}>
                    <h2>{concept.title}</h2>
                    
                    <h3>Definition</h3>
                    <p>{concept.definition}</p>

                    <h3>where it is used</h3>
                    <p> {concept.use}</p>
                    
                    <h3>Example</h3>
                    <pre><code>{concept.example}</code></pre>
                </article>
            ))}
        </div>
    </section>
);
}