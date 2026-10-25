import {Routes, Route} from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProfilePreview from "./pages/ProfilePreview";
import CreateProfile from "./pages/CreateProfile";
import ProfileDetails from "./pages/ProfileDetails";
import LearningGuide from "./pages/LearningGuide";
import NotFound from "./pages/NotFound";

const initialProfile ={
  id: "SF-001",
  name: "",
  email:"",
  phone:"",
  education:"",
  course:"",
  careerGoal:"",
  skills:[],
  projects:[]
};

export default function App() {
  const [profile, setProfile] = useLocalStorage(
    "skillforge-profile",
    initialProfile
  );

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home profile={profile} />} />

        <Route
        path="/create"
        element={
          <CreateProfile
          profile={profile}
          setProfile={setProfile}
          />
        } />

        
        <Route
        path="/preview"
        element={
          <ProfilePreview
          profile={profile}/>
        } />


        <Route
        path="/profile/:id"
        element={
          <ProfileDetails
          profile={profile}/>
        } />

        <Route
        path="/guide"
        element={
          <LearningGuide
          profile={profile}
          
          />
        } />

        <Route
        path="*"
        element={
          <NotFound/>
        } />






      </Routes>
    </Layout>
  );
}

