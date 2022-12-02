
import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddAdmin from './components/AddAdmin'
import AddInstructor from './components/AddInstructor';
import AddCorporateTrainee from './components/AddCorporateTrainee';
import CreateCourse from './components/CreateCourse';
import Message from './components/receiveEmail';
import ViewCourses from './components/InstructorCoursesList';
import UploadVideo from './components/UploadVideoPage';
import Changepassword from './components/changepassword';
import Reset from './components/resetpassbutton';
import Discount from './components/discount';
//import { ResetPassword } from '../../Backend/Controller/userControl';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/resetpassbutton"
        element={<Reset/>}/>
      <Route path="/discount"
        element={<Discount/>}/>
      <Route path="/addAdmin"
        element={<AddAdmin/>}/>
      <Route path="/receiveEmail"
        element={<Message/>}/>
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
        <Route path="/changepassword"
        element={<Changepassword/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
