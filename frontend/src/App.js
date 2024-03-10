import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import BucketComponent from "./components/bucket-component";
import ObjectComponent from "./components/object-component";
import DownloadComponent from "./components/download-component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeComponent />} />
          <Route path="bucket" element={<BucketComponent />} />
          <Route path="object" element={<ObjectComponent />} />
          <Route path="download" element={<DownloadComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
