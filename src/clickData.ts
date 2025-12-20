import { create } from "zustand";

// 클릭시 필요한 데이터를 모아둔곳
type clickDataType = {
  activeType: null | string; // 현재 개의 품종
  setActiveType: (type: string) => void; // 개의 품종 변경 함수

  click: number; // 이미지 변경 클릭 횟수
  addClick: () => void; // 이미지 변경 클릭 횟수 증가
};

const clickData = create<clickDataType>((set) => ({
  activeType: null,
  setActiveType: (type) => set({ activeType: type }),

  click: 0,
  addClick: () => set((state) => ({ click: state.click + 1 })),
  minusClick: () => set((state) => ({ click: state.click - 1 })),
}));

export default clickData;
