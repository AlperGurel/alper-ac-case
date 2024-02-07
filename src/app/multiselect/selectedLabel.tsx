import { HiX } from "react-icons/hi";

interface SelectedLabelProps {
  name: string;
  id: number;
  onDelete: (id: number) => void;
  labelRef: any;
}

export default function SelectedLabel({
  name,
  id,
  onDelete,
  labelRef,
}: SelectedLabelProps) {
  const handleClick = () => {
    onDelete(id);
  };
  return (
    <div
      ref={labelRef}
      tabIndex={0}
      className="bg-slate-300 text-sm rounded-xl p-1 pr-[30px] relative flex-none flex items-center h-[30px] focus:bg-blue-200 outline-none"
    >
      <div>{name}</div>
      <div
        onClick={handleClick}
        className="bg-slate-400 rounded-lg flex w-[20px] h-[20px] justify-center items-center absolute right-[5px] top-[5px] cursor-pointer hover:bg-slate-500"
      >
        <HiX color="white" />
      </div>
    </div>
  );
}
