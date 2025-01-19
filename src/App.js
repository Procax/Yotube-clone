import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './utils/Store';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WatchPage from './components/WatchPage';
import Maincontainer from './components/Maincontainer'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          {/* Main Layout */}
          <Route path="/" element={<Body />}>
            <Route index element={<Maincontainer />} /> {/* Default child */}
            <Route path="watch" element={<WatchPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
