import { TypeButton } from "../../component/TypeButton/TypeButton";
import clickData from "../../clickData";
import "./PhotoType.css";

export default function photoType() {
  const setActiveType = clickData((state) => state.setActiveType);
  const setClick = clickData((state) => state.addClick);

  // 클릭시 실행시킬 함수
  const clickFn = (text: string) => {
    setActiveType(text); // 품종 재세팅 함수
    setClick(); // 클릭 횟수 추가 함수
  };

  const type = ["Random", "Husky", "Beagle", "Shiba"];
  const typeItem = type.map((value) => (
    <TypeButton onClick={() => clickFn(value)} key={`phtoType button ${value}`}>
      {value}
    </TypeButton>
  ));

  return (
    <div className="photoType">
      <div className="typeBox">{typeItem}</div>
    </div>
  );
}
