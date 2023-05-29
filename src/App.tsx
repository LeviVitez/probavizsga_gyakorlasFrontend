import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './App.css';
import Main from './pages/Main';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <><Helmet>
      <title> Petrik Könyvklub</title>
    </Helmet>
    <Main></Main></>
  );  
}

export default App;
