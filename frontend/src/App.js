
import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddAdmin from './components/AddAdmin'
import AddInstructor from './components/AddInstructor';
import AddCorporateTrainee from './components/AddCorporateTrainee';
import CreateCourse from './components/CreateCourse';
import ViewCourses from './components/InstructorCoursesList';
import UploadVideo from './components/UploadVideoPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/addAdmin"
        element={<AddAdmin/>}/>
      <Route path="/addInstructor"
        element={<AddInstructor/>}/>
      <Route path="/addCorporateTrainee"
        element={<AddCorporateTrainee/>}/>
      <Route path="/createCourse"
        element={<CreateCourse/>}/>
      <Route path="/myCourses"
        element={<ViewCourses/>}/>
      <Route path="/uploadVideo"
        element={<UploadVideo/>}/>
      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
