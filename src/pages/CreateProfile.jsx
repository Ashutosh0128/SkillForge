import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const emptySkill = () => ({
    // here id taken crypto for storing it inside has value and random number will be allocated to new id
    id:crypto.randomUUID(),
    name:"",
    level:"Beginner"
});

const emptyProject=() => ({
    id:crypto.randomUUID(),
    title:"",
    description:"",
    tech:""
});

export default function CreateProfile ({profile,setProfile})
{
    const navigate= useNavigate();
    const careerGoalRef = useRef(null);

    const [form,setForm] = useState (() =>({
        name:profile.name,
        email:profile.email,
        phone:profile.phone,
        education:profile.education,
        skills:profile.skills.length ? profile.skills.map((skill) => ({...skill})) : [emptySkill()],
        project:profile.project.length ? profile.project.map((project) =>({...project})) : [emptyProject()]
    }));

    const [errors,setErrors]=useState({});

    function handleChange(event){
        const {name,value}=event.target;
        setForm((previous) => ({
            ...previous,
            [name]:value
        }));
    }

    function updateSkill(id,field,value) {
        setForm((previous) =>({
            ...previous,
            skills:previous.skills.map((skill) =>skill.id === id ? {...skill,[field]:value}:skill)
        }));
    }

    function addSkill(){
        setForm((previous)=> ({
            ...previous,
            skills:[...previous.skills,emptySkill()]
        }));
    }

    function removeSkill(){
        setForm((previous)=>({
            ...previous,
            skills:previous.skills.filter((skill)=>skill.id !== id)
        }))
    }

    function updateProject(id,field,value){
        setForm((previous)=>({
            ...previous,
            projects:previous.projects.map((project)=>project.id == id ? {...project,[field]:value}:project)
        }))
    }

    function addProject(){
        setForm((previous)=>({
            ...previous,
            projects:[...previous.project,emptyProject()]
        }))
    }

    function removeProject(){
        setForm((previous)=>({
            ...previous,
            projects:previous.project.filter((project)=>project.id !==id)
        }))
    }

    function validate(){
        const nextErrors = {};

        if (!form.name.trim()){
            nextErrors.name ="Full name is required";
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
        {
            nextErrors.email="Enter valid email address";
        }
        if(!/^[6-9]\d{9}$/.test(form.phone)) {
            nextErrors.phone="Enter valid phone number"
        }
        if(!form.education.trim()){
            nextErrors.education="Enter Education"
        }
        if(!form.course){
            nextErrors.course="Select Course"
        }
        const enteredSkills = form.skills.map((skill)=>skill.name.trim().toLowerCase()).filter(Boolean)

        if(enteredSkills.length=== 0)
        {
            nextErrors.skills = "Add atleast 1 skill"
        }

        if (new Set(enteredSkills).size !== enteredSkills.length){
            nextErrors.skills = "Duplicate skills are not allowed";
        }

        form.skills.forEach((skill)=>{
            if(!skill.name.trim()){
                nextErrors[`skill =${skill.id}`] = "Enter a skill name";
            }
        })

        form.projects.forEach((project)=>{
            if (project.title.trim() && !project.description.trim())
            {
                nextErrors[`project=${project.id}`] = "Add description for this project";
            }
            if(
                !project.title.trim() && (project.description.trim() || project.tech.trim())
            )
            {
                nextErrors[`project =${project.id}`] ="Enter project title"
            }
        })

        setErrors(nextErrors);
        return Object.keys(nextErrors).length ===0;





    }

    return (
        <section className="form-page">
            <div className="page-heading">
                <p className="eyebrow">PROFILE BUILDER</p>
                <h1>Create your career profile</h1>
                <p className="muted">
                    Complete your information and showcase abilites.
                </p>
            </div>

            <form className="card form-card" onSubmit={handleSubmit} noValidate>
                <h2>Personal Information</h2>

                <div className='form-grid'>
                    <div className='field'>
                        <label htmlFor="name">Full name</label>
                        <input 
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder='Enter your full name'/>
                        {errors.name && <p className='error'>{errors.name}</p>}
                           
                    </div>
                    <div className='field'>
                        <label htmlFor='email'>Email address</label>
                        <input
                        id='email'
                        name='email'
                        type='email'
                        value={form.email}
                        onChange={handleChange}
                        placeholder='you@example.com'
                        />
                        {errors.email && <p className='error'>{errors.email}</p>}
                    </div>

                    <div className='field'>
                        <label htmlFor='phone'>Mobile number</label>
                        <input
                        id='phone'
                        name='phone'
                        type='phone'
                        value={form.phone}
                        onChange={handleChange}
                        inputMode={10}
                        placeholder='10-digit mobile number'
                        />
                        {errors.email && <p className='error'>{errors.phone}</p>}
                    </div>

                    <div className='field'>
                        <label htmlFor='education'>Education</label>
                        <input
                        id='education'
                        name='education'
                        type='education'
                        value={form.education}
                        onChange={handleChange}
                        placeholder='e.g. B.SC. Computer Science'
                        />
                        {errors.email && <p className='error'>{errors.education}</p>}
                    </div>

                    <div className='field'>
                        <label htmlFor='course'>Current Course</label>
                        <select
                        id='course'
                        name='course'
                        type='course'
                        value={form.course}
                        onChange={handleChange}
                        >
                         <option value="">Select a course</option>
                         <option value="React Development">React Development</option>
                         <option value="Python Development">Python Development</option>
                         <option value="Full Stack Development">Full Stack Development</option>
                         <option value=".NET Development">.NET Development</option>
                         <option value="Data Science">Data Science</option>
                         </select>

                        {errors.email && <p className='error'>{errors.course}</p>}
                    </div>

                    <div className='field'>
                        <label htmlFor='carrerGoal'>Career goal(uncontrolled input)</label>
                        <input
                        id='careerGoal'
                        ref={careerGoalRef}
                        defaultValue={profile.careerGoal}
                        placeholder='e.g. Become a React developer'/>
                        <p className='muted small'>
                            This field uses useRef instead of storing each keystroke in state.
                        </p>
                    </div>

                    <hr/>

                    <div className='section-heading'>
                        <div>
                            <h2>Technical Skills</h2>
                            <p className='muted'>Add your skills and proficiency levels</p>
                        </div>
                        <button type='button' className='button secondary' onClick={addSkill}>
                            + Add Skill
                        </button>
                    </div>
                    {errors.skills && <p className='error'>{errors.skills}</p>}

                    {form.skills.map((skill,index)=>(
                        <div className='dynamic-row' key={skill.id}>
                            <div className='field'>
                                <label htmlFor={`skill-${skill.id}`}>
                                    Skill {index + 1}
                                </label>

                                <input
                                id={`skill-${skill.id}`}
                                value={skill.name}
                                onChange={(event) =>
                                    updateSkill(skill.id, "name", event.target.value)
                                }
                                placeholder='e.g. Javascript'
                                />
                                {errors[`skill-${skill.id}`] && (
                                    <p className='error'>{errors[`skill-${skill.id}`]}</p>
                                )}
                            </div>

                            <div className='field'>
                                <label htmlFor={`level-${skill.id}`}>Proficiency</label>
                                <select
                                id={`level-${skill.id}`}
                                value={skill.level}
                                onChange={(event)=>
                                    updateSkill(skill.id, "level", event.target.value)
                                }>
                                    <option >Beginner</option>
                                    <option >Intermediate</option>
                                    <option >Advanced</option>
                                </select>                                
                            </div>

                            <button
                            type='button'
                            className='button danger'
                            onClick={() =>removeSkill(skill.id)}
                            disabled={form.skills.length ===1}
                            >
                                Remove
                            </button>
                            </div>
                    ))}

                    <hr/>

                    <div className='section-heading'>
                        <div>
                            <h2>Projects</h2>
                            <p className='muted'>Demostrate what you have built</p>
                        </div>
                        <button type='button' className='button secondary' onClick={addProject}>
                            + Add Project
                        </button>
                    </div>

                    {form.projects.map((project, index) =>(
                        <div className='project-form' key={project.id}>
                            <div className='section-heading'>
                                <h3>Project {index + 1}</h3>
                                <button
                                type='button'
                                className='button-danger'
                                onClick={()=>removeProject(project.id)}
                                >
                                    Remove
                                </button>
                            </div>

                            <div className='field'>
                                <label htmlFor={`title-${project.id}`}>Project title</label>
                                <input 
                                id={`title-${project.id}`}
                                value={project.title}
                                onChange={(event) =>
                                    updateProject(project.id, "title", event.target.value)
                                }
                                placeholder='e.g. SkillForge'
                                />
                            </div>

                            <div className='field'>
                                <label htmlFor={`description-${project.id}`}>Description</label>
                                <input 
                                id={`description-${project.id}`}
                                value={project.description}
                                onChange={(event) =>
                                    updateProject(project.id, "description", event.target.value)
                                }
                                placeholder='What problem does your project solve?'
                                rows={3}
                                />
                            </div>

                            <div className='field'>
                                <label htmlFor={`tech-${project.id}`}>Technologies</label>
                                <input 
                                id={`tech-${project.id}`}
                                value={project.tech}
                                onChange={(event) =>
                                    updateProject(project.id, "tech", event.target.value)
                                }
                                placeholder='React , Javascript, CSS'
                                />
                            </div>

                            {errors[`project-${project.id}`] && (
                                <p className='error'>{errors[`project-${project.id}`]}</p>
                            )}

                            </div>
                    ))}

                    <button type='submit' className='button submit-button'>
                        Save Profile & Preview
                    </button>

                </div>
            </form>
        </section>
    );

}