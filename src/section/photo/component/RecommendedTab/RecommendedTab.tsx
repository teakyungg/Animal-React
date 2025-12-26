import { useEffect, useState } from "react";
import { TypeButton } from "../../../../component/TypeButton/TypeButton";
import useData from "../../../../userData";
import userData from "../../../../userData";
import "./RecommendedTab.css";

// 전체 커밋찍기

export default function RecommendedTab() {
  const allDogType = useData((state) => state.allDogType); // 모든 강아지의 타입 (이거 값 다른 곳에서 await 형태로 세팅됨)
  const activeType = userData((state) => state.activeType); // 현재 클릭한 타입
  const selectType = userData((state) => state.selectType); // 이미지 변경시 실행할 함수

  const [randomArr, setRandomArr] = useState<string[]>([]);

  // 원래 useEffect 안써도 되지만 렌더링 전에 Math.random 라는  비순수 함수를 사용하는게
  // 권장되지 않기에 일부로 useEffect를 사용함
  useEffect(() => {
    if (allDogType.length <= 2) return;
    setRandomArr([...allDogType].sort(() => 0.5 - Math.random()).slice(0, 3));
  }, [allDogType, activeType]);

  const typeItem = randomArr.map((value, index) => (
    <TypeButton
      key={`RecommendedTab ${index}`}
      onClick={() => {
        selectType(value);
      }}
    >
      {value}
    </TypeButton>
  ));

  return (
    <div className="images RecommendedTab">
      <div>이런 강아지는 어떠세요?</div>
      <div className="title">추천 강아지</div>
      <div className="types">{typeItem}</div>
    </div>
  );
}
