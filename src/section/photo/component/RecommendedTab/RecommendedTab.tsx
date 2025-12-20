import { TypeButton } from "../../../../component/TypeButton/TypeButton";
import clickData from "../../../../clickData";
import "./RecommendedTab.css";

// 추천 탭
export default function RecommendedTab() {
  const setActiveType = clickData((state) => state.setActiveType);
  const setClick = clickData((state) => state.addClick);

  // 클릭시 실행시킬 함수
  const clickFn = (text: string) => {
    setActiveType(text); // 품종 재세팅 함수
    setClick(); // 클릭 횟수 추가 함수
  };

  const type = ["Random", "Husky", "Beagle", "Shiba"];
  const typeItem = type.map((value) => (
    <TypeButton onClick={() => clickFn(value)} key={`Recommended Button ${value}`}>
      {value}
    </TypeButton>
  ));

  return (
    <div className="images RecommendedTab">
      <div className="sub-title">이런 강아지는 어떠세요?</div>
      <div className="title">추천 강아지</div>
      <div className="types">{typeItem}</div>
    </div>
  );
}
