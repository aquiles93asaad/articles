import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ArticlesList from './ArticlesList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ArticlesList />
          }
        />
        {/* <Route
          path="/article"
          element={
            
          }
        /> */}
        <Route path="/" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
