import { Header } from "./section/Header/Header";
import { Suspense, lazy } from "react";

// lazy : 컴포넌트를 지금 당장 안 불러오고, 필요할 때 나중에 불러오게 해줌
// Suspense : lazy로 불러오는 컴포넌트가 아직 로드 중일 때 대신 보여줄 화면(fallback)을 정하는 컴포넌트.
const Photo = lazy(() => import("./section/Photo/Photo"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <Photo />
      </Suspense>
    </>
  );
}

export default App;
