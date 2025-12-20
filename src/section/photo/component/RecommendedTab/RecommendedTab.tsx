import { TypeButton } from "../../../../component/TypeButton/TypeButton";
import useData from "../../../../userData";
import "./RecommendedTab.css";
import userData from "../../../../userData";

// 추천 탭
export default function RecommendedTab() {
  const allDogType = useData((state) => state.allDogType); // 모든 강아지의 타입
  const activeType = useData((state) => state.activeType); // 현재 클릭한 개의 품종
  const selectType = userData((state) => state.selectType); // 이미지 변경시 실행할 함수

  const typeItem = allDogType.map((value) => {
    if (activeType !== value) {
      return (
        <TypeButton onClick={() => selectType(value)} key={`Recommended Button ${value}`}>
          {value}
        </TypeButton>
      );
    }
  });

  return (
    <div className="images RecommendedTab">
      <div className="sub-title">이런 강아지는 어떠세요?</div>
      <div className="title">추천 강아지</div>
      <div className="types">{typeItem}</div>
    </div>
  );
}
