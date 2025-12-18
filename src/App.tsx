import { useState } from "react";
import Photo from "./component/photo/photo";
import PhotoType from "./component/photoType/photoType";

function App() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [click, setClick] = useState(0);

  return (
    <>
      <PhotoType setActiveType={setActiveType} setClick={setClick} />
      <Photo activeType={activeType} click={click} />
    </>
  );
}

export default App;
