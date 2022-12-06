
import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddAdmin from './components/AddAdmin'
import AddInstructor from './components/AddInstructor';
import AddCorporateTrainee from './components/AddCorporateTrainee';
import CreateCourse from './components/CreateCourse';
import ViewCourses from './components/CoursesList';
import UploadVideo from './components/UploadVideoPage';
import ViewVideo from './components/ViewVideo';
import Results from './components/SearchResults';
import SignIn from './components/Login';
import ViewCourse from './components/Course';
import ViewInstructor from './components/Instructor';
import Edit from './components/EditInstructor';
import ViewCourseInstructor from './components/CourseInstructor';
import Message from './components/ReceiveEmail';
import Discount from './components/Discount';
import Changepassword from './components/ChangePassword';
import InstructorViewCourses from './components/InstructorCoursesList';
import CreateExam from './components/CreateExam';
import CreateQuestion from './components/CreateQuestion';
import ViewExercises from './components/ViewExercises';
import ViewQuestion from './components/ViewQuestion';
import ViewGradeCorporate from './components/ViewGradeCorporate';
import ViewQuestionAnswers from './components/ViewQuestionAnswers';
import Contract from './components/AcceptTerms';
import InstructorResults from './components/FilterResultsInstructor';

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
      <Route path="/courses"
        element={<ViewCourses/>}/>
      <Route path="/uploadVideo"
        element={<UploadVideo/>}/>
      <Route path="/viewVideo"
        element={<ViewVideo/>}/>
      <Route path="/login"
        element={<SignIn/>}/>
      <Route path="/results"
        element={<Results/>}/>
      <Route path="/instructorresults"
        element={<InstructorResults/>}/>
      <Route path="/course"
        element={<ViewCourse/>}/>
      <Route path="/viewInstructor"
        element={<ViewInstructor/>}/>
      <Route path="/edit"
        element={<Edit/>}/>
      <Route path="/myCourse"
        element={<ViewCourseInstructor/>}/>
      <Route path="/receiveEmail"
        element={<Message/>}/>
      <Route path="/discount"
        element={<Discount/>}/>
      <Route path="/changepassword"
        element={<Changepassword/>}/>
      <Route path="/myCourses"
        element={<InstructorViewCourses/>}/>
      <Route path="/createExam"
        element={<CreateExam/>}/>
      <Route path="/createQuestion"
        element={<CreateQuestion/>}/>
      <Route path="/viewExercies"
        element={<ViewExercises/>}/>
      <Route path="/viewQuestion"
        element={<ViewQuestion/>}/>
      <Route path="/viewGrade"
        element={<ViewGradeCorporate/>}/>
      <Route path="/viewQuestionAnswers"
        element={<ViewQuestionAnswers/>}/>
      <Route path="/acceptTerms"
        element={<Contract/>}/>
      </Routes>
      
      
      </BrowserRouter>
    </div>
  );
}

export default App;
