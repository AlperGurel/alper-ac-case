import Image from "next/image";
import { useState } from "react";

export default function ResultRow(props: any) {
  const [isChecked, setIsChecked] = useState(props.isSelected);
  const startIndex = props.characterData.name
    .trim()
    .toLowerCase()
    .indexOf(props.searchText.trim());
  const endIndex = startIndex + props.searchText?.trim().length;
  const isBold = (index: number) => {
    if (index >= startIndex && index < endIndex) {
      return true;
    }
    return false;
  };

  const handleChange = (event: any) => {
    setIsChecked(event.target.checked);
    props.onChange(event.target.checked);
  };

  return (
    <div
      tabIndex={0}
      ref={props.rowRef}
      className="h-[100px] pt-4 pl-4 border-b-2 border-slate-400 last:border-0 flex items-center gap-2 focus:bg-blue-100 outline-none"
    >
      <input
        type="checkbox"
        tabIndex={-1}
        checked={isChecked}
        onChange={handleChange}
      />
      <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={props.characterData.image}
          alt={"Image of " + props.characterData.name}
          className="max-w"
        />
      </div>

      <div className="flex flex-col">
        <div className="text-md text-slate-800">
          {props.characterData.name
            .split("")
            .map((char: string, index: number) => (
              <span
                key={index}
                className={isBold(index) ? "font-bold" : ""}
              >
                {char}
              </span>
            ))}
        </div>
        <div className="text-sm text-slate-500">
          {props.characterData.episode.length} Episodes
        </div>
      </div>
    </div>
  );
}
