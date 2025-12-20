import { useEffect, useRef, useState } from "react";
import { fetchImage } from "./fetchImage";
import Packery from "packery";
import imagesLoaded from "imagesloaded";
import "./photo.css";
import RecommendedTab from "./component/RecommendedTab/RecommendedTab";
import clickData from "../../clickData";

export default function Photo() {
  const activeType = clickData((state) => state.activeType); // 현재 강아지 품종
  const click = clickData((state) => state.click); // 클릭 횟수

  const pckryBox = useRef<HTMLDivElement | null>(null); // pckry 라이브러리 적용 요소
  const [photos, setPhotos] = useState<string[]>([]); // 사진 리스트
  const [imgLoad, setImgLoad] = useState(false); // 이미지 로딩 완료 체크
  const imgCenterIndex = Math.floor(photos.length / 2); //이미지 배열 중간 값 (다른 강아지 추천 탭에 사용)

  useEffect(() => {
    // 이미지 정보 가져오기
    async function loadImage() {
      try {
        // 이미지 주소 배열을 setPhotos 함수에 세팅
        const data = await fetchImage(activeType);
        setPhotos(data.message);
        setImgLoad(false);
      } catch {
        alert("나중에 다시 시도해 주세요.");
      }
    }
    loadImage();
  }, [click]);

  useEffect(() => {
    if (!pckryBox.current) return; // packery 라이브러리 입력박스 없다면 리턴
    if (photos.length <= 0) return; // 현재 사진 갯수 없다면 리턴

    const packery = new Packery(pckryBox.current, {
      // options
      itemSelector: ".images",
      gutter: 16,
    });

    imagesLoaded(pckryBox.current, () => {
      packery.layout();
    });

    packery.on("layoutComplete", () => {
      setImgLoad(true);
    });

    return () => {
      packery.destroy();
    };
  }, [photos]);

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
    </div>
  );
}
