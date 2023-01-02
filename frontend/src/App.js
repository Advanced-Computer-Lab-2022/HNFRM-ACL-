
import React ,{useState,useEffect}from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddAdmin from './components/AddAdmin'
import AddInstructor from './components/AddInstructor';
import AddCorporateTrainee from './components/AddCorporateTrainee';
import CreateCourse from './components/CreateCourse';
import CreateSubtitle from './components/CreateSubtitle';
import ViewCourses from './components/CoursesList';
import ViewVideo from './components/ViewVideo';
import SignIn from './components/Login';
import ViewCourse from './components/Course';
import ViewInstructor from './components/Instructor';
import Edit from './components/EditInstructor';
import Changepassword from './components/ChangePassword';
import CreateExam from './components/CreateExam';
import ViewGradeCorporate from './components/ViewGrade';
import ViewQuestionAnswers from './components/ViewQuestionAnswers';
import FilterResults from './components/FilterResults';
import SignUp from './components/SignUp';
import MainPage from './components/MainPage';
import Policy from './components/Policy';
import ViewProblems from './components/ReportedProblems';
import StickyHeadTable from './components/RefundRequests';
import StickyCourse from './components/CourseRequests';
import Report from './components/ReportProblem';
import FirstHomePage from './components/FirstHomePage';
import ViewPrev from './components/Previously';
import SearchResults from './components/Results'
import CountrySelector from './Headers/Test'
import Contract from './components/Contract';
import PaymentForm from './components/CheckoutForm';
import ViewMyCourses from './components/CoursesInstructorList'
import ViewExam from './components/ViewExam'
import SearchResultsInst from './components/ResultsInstructor'
import FilterResultsInstructor from './components/FilterResultsInstructor'
import SetPromotion from './components/SetPromotion'
import PageNotFound from './components/PageNotFound'
import ViewTrainee from './components/ViewInstructorTrainee';






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
      <Route path="/viewVideo"
        element={<ViewVideo/>}/>
      <Route path="/login"
        element={<SignIn/>}/>
      <Route path="/results"
        element={<SearchResults/>}/>
      <Route path="/view"
        element={<ViewInstructor/>}/>
      <Route path="/viewInstructor"
        element={<ViewTrainee/>}/>  
      <Route path="/edit"
        element={<Edit/>}/>
      <Route path="/changepassword"
        element={<Changepassword/>}/>
      <Route path="/createExam"
        element={<CreateExam/>}/>
      <Route path="/viewGrade"
        element={<ViewGradeCorporate/>}/>
      <Route path="/viewQuestionAnswers"
        element={<ViewQuestionAnswers/>}/>
      <Route path="/countrySelector"
        element={<CountrySelector/>}/>
      <Route path="/SignUp"
        element={<SignUp/>}/>
      <Route path="/home"
        element={<MainPage/>}/>
      <Route path="/policy"
        element={<Policy/>}/>
      <Route path="/contract"
        element={<Contract/>}/>  
      <Route path="/course"
        element={<ViewCourse/>}/>
      <Route path="/reportedProblems"
        element={<ViewProblems/>}/>
      <Route path="/refundRequests"
        element={<StickyHeadTable/>}/>
      <Route path="/courseRequests"
        element={<StickyCourse/>}/>
      <Route path="/report"
        element={<Report/>}/>
      <Route path="/"
        element={<FirstHomePage/>}/> 
      <Route path="previousProblems"
        element={<ViewPrev/>}/>
      <Route path='filterResults'
         element={<FilterResults/>}/>  
      <Route path='test'
         element={<CountrySelector/>}/>
      <Route path='card'
         element={<PaymentForm/>}/>
      <Route path='createSubtitle'
         element={<CreateSubtitle/>}/> 
      <Route path='myCourses'
         element={<ViewMyCourses/>}/>     
      <Route path='viewExam'
         element={<ViewExam/>}/>
      <Route path='instructorresults'
         element={<SearchResultsInst/>}/>
         <Route path='instructorfilterResults'
         element={<FilterResultsInstructor/>}/>
      <Route path='set'
         element={<SetPromotion/>}/>
      <Route path='notfound'
         element={<PageNotFound/>}/>       
                           
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
