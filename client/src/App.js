import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddTask } from './components/AddTask';
import { EditTask } from './components/EditTask';

function App() {
  return (
    <div className='App'>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddTask />} />
          <Route path="/edittask/:id" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
