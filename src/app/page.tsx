import Image from "next/image";
import { MultiSelect } from "./multiselect";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="text-slate-500 w-[400px]">
        <p>
          Press <b>/</b> to focus input and start typing.
        </p>
        <p>
          Press <b>Up</b> and <b>Down</b> arrow keys to switch results.
        </p>
        <p className="text-xs text-red-400 ml-4 mb-2">
          I could not syncronize tab and arrow keys. Use arrow keys instead of
          tab please :(
        </p>
        <p>
          Press <b>Enter</b> to select/unselect focused element.
        </p>
        <p>
          Press <b>Left</b> and <b>Right</b> arrow keys to switch selected
          elements. Press <b>Enter</b> to remove from selection.
        </p>
      </div>
      <div>
        <MultiSelect />
      </div>
    </main>
  );
}
