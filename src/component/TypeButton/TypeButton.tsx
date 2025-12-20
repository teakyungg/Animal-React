import "./TypeButton.css";

interface TypeItemType {
  onClick?: () => void; // onclick일때 실행 시킬 함수 모음
  children: string;
}

// 버튼 클릭 시
// 클릭한 개의 품종과, 클릭횟수를 증가시키는 컴포넌트
export function TypeButton({ children, onClick }: TypeItemType) {
  return (
    <button className="typeButton" onClick={onClick}>
      {children}
    </button>
  );
}
