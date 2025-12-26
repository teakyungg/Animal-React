import "./TypeButton.css";

interface TypeItemType {
  onClick?: () => void; // onclick일때 실행 시킬 함수 모음
  children: string;
}

// 버튼 클릭 시
// 클릭한 개의 품종과, 클릭횟수를 증가시키는 컴포넌트
export function TypeButton({ children, onClick }: TypeItemType) {
  const capitalizeFirst = (str: string) => (str ? str[0].toUpperCase() + str.slice(1) : str);

  return (
    <button className="typeButton">
      <span className="button_top" onClick={onClick}>
        {capitalizeFirst(children)}
      </span>
    </button>
  );
}
