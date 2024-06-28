import { Routes, Route } from 'react-router-dom';
import Navigate from './pages/Navigate';
import Voice from './pages/Voice';
import Beats from './pages/Beats';
import Images from './pages/Images';
import Summary from './pages/Summary';
import Completion from './pages/Completion';
import Grammar from './pages/Grammar';
import Landing from './pages/Landing';
import ProtectedRoutes from './util/ProtectedRoutes';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/models" element={<Navigate />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/voice" element={<Voice />}></Route>
          <Route path="/beats" element={<Beats />}></Route>
          <Route path="/image" element={<Images />}></Route>
          <Route path="/summary" element={<Summary />}></Route>
          <Route path="/completion" element={<Completion />}></Route>
          <Route path="/grammar" element={<Grammar />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
