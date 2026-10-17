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

    function RemoveProject(){
        setForm((previous)=>({
            ...previous,
            projects:previous.projects.filter((project)=>project.id !==id)
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
}