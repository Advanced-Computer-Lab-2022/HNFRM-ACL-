import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewQuestion from './Components/ViewQuestion';
import ViewQuestionAnswers from './Components/ViewQuestionAnswers';
import CreateQuestion from './Components/CreateQuestion';
import ViewGradeCorporate from './Components/ViewGradeCorporate';
import ViewGradeIndividual from './Components/ViewGradeIndividual';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/getQuestion"
        element={<ViewQuestion/>}/>
         <Route path="/getQuestionAnswers"
        element={<ViewQuestionAnswers/>}/>
        <Route path="/createQuestion"
        element={<CreateQuestion/>}/>
          <Route path="/viewGradeCorporate"
        element={<ViewGradeCorporate/>}/>
        <Route path="/viewGradeIndividual"
        element={<ViewGradeIndividual/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;