import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <main className="w-full flex flex-col bg-neutral-50 min-h-screen">
          <Navbar />
          {/*Routing*/}
          {/*Routes*/}
          {/*Footer */}
        </main>
      </Router>
    </>
  );
};

export default App;
