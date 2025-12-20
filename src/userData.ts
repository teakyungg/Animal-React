import { create } from "zustand";

type userDataType = {
  allDogType: string[]; // 모든 강아지의 타입
  imgLoad: boolean; // 이미지 로딩 상태 변수
  activeType: string; // 현재 클릭한 개의 품종
  click: number; // 이미지 변경 클릭 횟수

  selectType: (type: string) => void; // 이미지 변경시 호출할 함수
  finishImageLoad: () => void; // 이미지 로딩 완료시 호출할 함수
};

const userData = create<userDataType>((set) => ({
  allDogType: ["Random", "Husky", "Beagle", "Shiba"],
  imgLoad: false,
  activeType: "Random",
  click: 0,

  selectType: (type) => set((state) => ({ imgLoad: false, activeType: type, click: state.click + 1 })),
  finishImageLoad: () => set({ imgLoad: true }),
}));

export default userData;
