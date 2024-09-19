import { Route, Routes } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import SearchBar from "./components/global/SearchBar";
import HomePage from "./pages/HomePage";
import PackageDetail from "./pages/PackageDetail";

export default function App() {
  return (
    <div className="min-h-screen relative">

      <Navbar />
      <SearchBar />
      <main className="max-w-full px-4 md:px-8 mx-auto py-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/a" element={<AddEmployeePage />} /> */}
          <Route path="/package/:id" element={<PackageDetail />} />
          {/* <Route path="/add-employee" element={<AddEmployeePage />} /> */}
        </Routes>
      </main>

      {/* <footer className="bg-gray-100 py-8 absolute bottom-0">
        
      </footer> */}
    </div>
  )
}