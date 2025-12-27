import { Header } from "./section/Header/Header";
import { lazy } from "react";

// lazy : 컴포넌트를 지금 당장 안 불러오고, 필요할 때 나중에 불러오게 해줌
// FCP를 위한 코드
const Photo = lazy(() => import("./section/Photo/Photo"));

function App() {
  return (
    <>
      <Header />
      <Photo />
    </>
  );
}

export default App;
