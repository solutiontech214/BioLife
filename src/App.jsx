import React from "react";
import Navbar from "./components/Navbar";
import ModelViewer from "./components/ModelViewer";

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <Navbar />
      <ModelViewer />
    </div>
  );
}

export default App;
