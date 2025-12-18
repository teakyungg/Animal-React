import { useEffect, useRef, useState } from "react";
import { fetchImage } from "./fetchImage";
import Packery from "packery";
import imagesLoaded from "imagesloaded";

interface PhotoType {
  activeType: string | null; // 이미지 변경 타입
  click: number; // 이미지 변경 버튼
}

// 정리
// click 변경 → setPhotos → (리렌더) → DOM에 img 생성 → photos effect 실행 → Packery가 .images를 정상적으로 잡음

export default function Photo({ activeType, click }: PhotoType) {
  const [photos, setPhotos] = useState<string[]>([]); // 사진 리스트
  const pckryBox = useRef<HTMLDivElement | null>(null); // pckry 라이브러리 적용 El
  const [imgLoad, setImgLoad] = useState(0); // 이미지 로딩 체크

  useEffect(() => {
    // 이미지 정보 가져오기
    async function loadImage() {
      try {
        // 이미지 주소 배열을 setPhotos 함수에 세팅
        const data = await fetchImage(activeType);
        setPhotos(data.message); // [1. 사진들의 데이터를 받아옴 (변수 photos의 값 변경됨)]
      } catch {
        alert("나중에 다시 시도해 주세요.");
      }
    }
    loadImage();
  }, [click]); // 버튼 클릭 마다 재호출되도록 구성

  // [2. useEffect의 의존성에 적어둔 [photos] 속성으로 인하여]
  // photos의 값이 변경됨을 확인하고 useEffect를 실행함
  useEffect(() => {
    // pckry 라이브러리 세팅
    if (!pckryBox.current) return;

    const packery = new Packery(pckryBox.current, {
      // options
      itemSelector: ".images",
      gutter: 16,
    });

    // [3. 실행과정에서 imagesLoaded 함수를 통해 특정 요소에 이미지가 모두 로딩될때까지 대기함]
    // 모든 이미지가 로드가 끝났을 때
    imagesLoaded(pckryBox.current, () => {
      // [5. 여기 안에 코드가 실행이 됬다는 건, 지정한 요소의 이미지가 모두 로드가 되었다는 의미
      // 그 다음으로 packery.layout() 함수를 사용하여 사진이 들어있는 박스에 배치를 시작함]

      // 레이아웃 배치 시작
      packery.layout();
    });

    // [6. 모든 packery.on("layoutComplete", ()=>{}) 함수는 packery.layout()가 끝나면 호출되는 함수임]
    packery.on("layoutComplete", () => {
      // 함수 호출 조건
      // 1. useEffect 처음 실행 시
      // 2. 마지막 이미지 배치 완료시
      // 즉 시작시 2라는 값을 가지고 시작함
      // 이후 클릭 시 imgLoad의 값이 하나씩 증가함

      // [7. 즉 여기 부분은 이미지의 배치가 끝났음 기록할 수 있는 상황, 다만 이 함수가 반복적으로 실행되고 값을 기억할 필요가 있기에 useState 변수로 값을 저장
      // setImgLoad() 함수 안에 값을 변경, 즉 imgLoad의 값은 "n번째 이미지의 배치가 완료되었습니다."의 값임]
      setImgLoad(imgLoad + 1);
    });

    return () => {
      packery.destroy();
    };
  }, [photos]);

  return (
    <div style={{ backgroundColor: "lightgray" }}>
      {/* [8. click 변수는 버튼 클릭시 값 증가, click 변수값이 증가 후 이미지 로드 및 배치가 완료되면 imgLoad값이 증가함
          이로써 if문으로 서로 수치를 비교하여 배치가 끝난 타이밍을 확인이 가능해짐]
          (imgLoad에 -2를 하는 이유는 setImgLoad 함수가 들어있는 useEffet에서 시작시 무조건 2번 호출되기 때문에 기본적으로 2의 값을 가지고 시작해서 그럼)
          */}
      <div ref={pckryBox} style={{ visibility: click === imgLoad - 2 ? "visible" : "hidden" }}>
        {/* 문자열 배열 기반으로 img 태그 생성 */}
        {/* [4. 변수 photos의 데이터를 기반으로 map을 돌려서 img태그를 생성함] */}
        {photos.map((value: string, index: number) => (
          <img key={index} src={value} alt={`Random dom img ${index}`} className="images" style={{ maxWidth: "25%" }} />
        ))}
      </div>
      <div>이미지 누르기 전값 : {imgLoad}</div>
      <div>이미지 누른 값 : {click}</div>
    </div>
  );
}
