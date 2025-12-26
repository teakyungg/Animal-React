// 이미지 데이터 정보 서버에 요청
export async function fetchImage(type: string | null) {
  const serverUrl = import.meta.env.VITE_APP_SERVER_URL; // 서버 주소
  const imageLength = 30;
  let res;

  // 입력값이 없다면 기본으로 랜덤 이미지를 가져옮
  if (type == null || type == "Random") {
    type = "random";
    res = await fetch(`${serverUrl}/breeds/image/${type}/${imageLength}`);
  }

  // 특정 입력값이 있다면 입력값 기반으로 이미지를 가져옮
  else {
    const typeText = type[0].toLowerCase() + type.slice(1);
    res = await fetch(`${serverUrl}/breed/${typeText}/images/random/${imageLength}`);
  }

  if (!res.ok) {
    throw new Error("HTTP 에러");
  }

  // 데이터 변환
  const data = await res.json();
  return data;
}
