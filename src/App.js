
import Home from './pages/Home.jsx';
import Resume from './pages/Resume.jsx';
import {
  unstable_HistoryRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import history from './browserHistory';
import TaskManager from './pages/UseCallBackParent';
import InputFocusExample from './pages/UseRef';

function App() {
 
   
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/use-callback" element={<TaskManager />} />
        <Route path="/use-ref" element={<InputFocusExample />} />
        <Route path="/resume/:user_name" element={<Resume/>}/>
      </Routes>
  </Router>
  );
}

export default App;
