import { TypeButton } from "../../component/TypeButton/TypeButton";
import userData from "../../userData";
import "./PhotoType.css";

export default function photoType() {
  const selectType = userData((state) => state.selectType); // 품종 재세팅 함수
  const allDogType = userData((state) => state.allDogType); // 모든 강아지 타입

  const typeItem = allDogType.map((value) => (
    <TypeButton onClick={() => selectType(value)} key={`phtoType button ${value}`}>
      {value}
    </TypeButton>
  ));

  return (
    <div className="photoType">
      <div className="typeBox">{typeItem}</div>
    </div>
  );
}
