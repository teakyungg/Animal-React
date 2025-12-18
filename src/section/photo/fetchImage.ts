// 이미지 데이터 정보 서버에 요청
export async function fetchImage(type: string | null) {
  const serverUrl = import.meta.env.VITE_APP_SERVER_URL; // 서버 주소
  const imageLength = 10;
  let res;

  if (type == null || type == "Random") {
    type = "random";
    res = await fetch(`${serverUrl}/breeds/image/${type}/${imageLength}`);
  } else {
    const typeText = type[0].toLowerCase() + type.slice(1);
    res = await fetch(`${serverUrl}/breed/${typeText}/images/random/${imageLength}`);
  }

  if (!res.ok) {
    throw new Error("HTTP 에러");
  }

  const data = await res.json();
  return data;
}
