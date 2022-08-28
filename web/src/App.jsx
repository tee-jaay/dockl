import { HashRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import { CONTAINERS, HELP, IMAGES, VOLUMES } from "./constants/routes";
import ContainerList from "./components/containers/ContainerList";
import ImageList from "./components/images/ImageList";
import VolumeList from "./components/volumes/VolumeList";
import Help from "./components/help/Help";
import NotFound from "./components/not-found/NotFound";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path={CONTAINERS} element={<ContainerList />} />
        <Route path={IMAGES} element={<ImageList />} />
        <Route path={VOLUMES} element={<VolumeList />} />
        <Route path={HELP} element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
