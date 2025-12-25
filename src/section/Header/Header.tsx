import { useEffect, useRef, useState } from "react";
import "./Header.css";
import { TypeButton } from "../../component/TypeButton/TypeButton";
import userData from "../../userData";

export function Header() {
  const serverUrl = import.meta.env.VITE_APP_SERVER_URL; // 서버 주소
  const dogTypes = useRef<string[]>([]); // 품종 데이터
  const [buttonData, setButtonData] = useState<string[]>([]); // 버튼 데이터

  const inputRef = useRef<HTMLInputElement>(null); // input 초기화용
  const selectType = userData((state) => state.selectType); // 이미지 변경시 실행할 함수

  // 검색 조건 탐색 로직
  const searchType = (input: string) => {
    const text = input.trim().toLowerCase();
    if (text.length === 0) {
      setButtonData([]);
      return;
    }

    const found = dogTypes.current.filter((k) => k.includes(text)).slice(0, 8);
    setButtonData(found);
  };

  // 강아지 품좀 데이터 (한번만 가져오기)
  useEffect(() => {
    async function setType() {
      const res = await fetch(`${serverUrl}/breeds/list/all`);
      const data = await res.json();
      dogTypes.current = Object.keys(data.message);
    }
    setType();
  }, []);

  const buttonItem = buttonData.map((value) => (
    <TypeButton
      key={value}
      onClick={() => {
        selectType(value);
        setButtonData([]);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }}
    >
      {value}
    </TypeButton>
  ));

  return (
    <header>
      <div className="inner">
        <img src="/logo.svg" alt="animal logo" className="logo" />

        <input
          ref={inputRef}
          type="text"
          placeholder="원하는 품종을 검색해주세요"
          onChange={(e) => searchType(e.target.value)}
        />

        <TypeButton
          onClick={() => {
            selectType("Random");
            setButtonData([]);
            if (inputRef.current) {
              inputRef.current.value = "";
            }
          }}
        >
          Random
        </TypeButton>
      </div>

      {buttonData.length > 0 && <div className="photoType">{buttonItem}</div>}
    </header>
  );
}
