import { BrowserRouter, Routes, Route } from "react-router-dom";




// Lab Pages


// App
import Login from "./composents/login";
import Register from "./composents/Register";
import Questions from "./composents/Questions";
import Question from "./composents/Question";


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login />}></Route>
        <Route path="/stackoverteccart/register" element={<Register />}></Route>
        <Route path="/stackoverteccart/questions" element={<Questions />}></Route>
        <Route path="/stackoverteccart/question/:id" element={<Question />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
