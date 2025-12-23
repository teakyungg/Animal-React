import { useEffect, useRef, useState } from "react";
import { fetchImage } from "./fetchImage";
import Packery from "packery";
import imagesLoaded from "imagesloaded";
import "./photo.css";
import RecommendedTab from "./component/RecommendedTab/RecommendedTab";
import userData from "../../userData";
import { ScaleLoader } from "react-spinners";

export default function Photo() {
  const activeType = userData((state) => state.activeType); // 현재 강아지 품종
  const click = userData((state) => state.click); // 클릭 횟수 감지
  const imgLoad = userData((state) => state.imgLoad); // 이미지 로딩 상태
  const finishImageLoad = userData((state) => state.finishImageLoad); // 이미지 로딩 상태 변경 함수

  const pckryBox = useRef<HTMLDivElement | null>(null); // pckry 라이브러리 적용 요소
  const [photos, setPhotos] = useState<string[]>([]); // 사진 리스트

  const imgCenterIndex = Math.floor(photos.length / 2); //이미지 배열 중간 값 (다른 강아지 추천 탭에 사용)

  useEffect(() => {
    // 이미지 정보 가져오기
    async function loadImage() {
      try {
        // 이미지 주소 배열을 setPhotos 함수에 세팅
        const data = await fetchImage(activeType);
        setPhotos(data.message);
      } catch {
        alert("나중에 다시 시도해 주세요.");
      }
    }
    loadImage();
  }, [click]); // 클릭 감지시 실행

  useEffect(() => {
    if (photos.length <= 0) return; // 현재 사진 갯수 없다면 리턴

    // 항상 이미지가 새롭게 만들어지기에 새로운 객체를 생성해야한다.
    const packery = new Packery(pckryBox.current, {
      // options
      itemSelector: ".images",
      gutter: 16,
    });

    imagesLoaded(pckryBox.current, () => {
      packery.layout();
    });

    packery.on("layoutComplete", () => {
      finishImageLoad();
    });

    return () => {
      packery.destroy();
    };
  }, [photos]); // 새로운 이미지 정보가 들어왔을때 실행

  return (
    <div className="photo">
      <div ref={pckryBox} style={{ visibility: imgLoad ? "visible" : "hidden" }}>
        {photos.map((value: string, index: number) => {
          // 다른 강아지 추천 창
          if (index === imgCenterIndex) {
            return <RecommendedTab key={"RecommendedTab"} />;
          }

          // 일반 강아지 사진 표현
          else {
            return <img key={index} src={value} alt={`Random dom img ${index}`} className="images" />;
          }
        })}
      </div>
      {!imgLoad && (
        <div className="loading">
          <ScaleLoader color="#565656" />
        </div>
      )}
    </div>
  );
}
