import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import {BrowserRouter,Routes,Route,Link,Router,Switch} from 'react-router-dom';
import './App.css';
import { QueryClientProvider, QueryClient } from 'react-query'
import { QuestionList } from './pages/QuestionList';
import { Questionbyid } from './pages/QuesbyId';
import { Feed } from './pages/Feed';


const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="App">
      <BrowserRouter>
      <nav>
      
      <ul className='ul'>
      <div className='d-flex'>
            <li>
            <a href="/" id="header_logo" class="brand w-nav-brand">
            <img src="https://assets.website-files.com/61e11b8fa08f25284939d84f/6390d3b2ca2d874238b4c6db_Group%202676.svg" loading="lazy" alt="" class="image"/>
            </a>
            </li>

            <div className='d-flex links'>
            <li className='li'>
              <Link to='/' className="white btn btn-xs">Question List</Link>
            </li>

            {/* <li className='li'>
              <Link to='/question/new' className="white btn btn-xs">Add new Question</Link>
            </li> */}

            <li className='li'>
              <Link to='/feed' className="white btn btn-xs">Questions</Link>
            </li>
            </div>
     
            </div>
        </ul>
      
      </nav>
     
      <Routes>
        <Route path="/"  element={<QuestionList />}></Route>
        {/* <Route path="/question/new"  element={<QuestionAdd/>}></Route> */}
        <Route path="/question/:id" element={<Questionbyid />}></Route>
        <Route path="/feed"  element={<Feed />}></Route>
      </Routes>
     </BrowserRouter>
    </div>
    </QueryClientProvider>
  );
}

export default App;
