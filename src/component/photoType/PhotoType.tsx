import style from "./PhotoType.module.css";

interface photoType {
  setActiveType: (type: string) => void;
  setClick: React.Dispatch<React.SetStateAction<number>>;
}

export default function photoType({ setActiveType, setClick }: photoType) {
  const type = ["Random", "Husky", "Beagle", "Shiba"];
  const typeItem = type.map((value) => (
    <li
      key={value}
      className={style.typeItem}
      onClick={() => {
        setActiveType(value);
        setClick((prev) => prev + 1);
      }}
    >
      {value}
    </li>
  ));

  return (
    <div className={style.photoType}>
      <ul style={{ display: "flex", gap: "20px" }}>{typeItem}</ul>
    </div>
  );
}
