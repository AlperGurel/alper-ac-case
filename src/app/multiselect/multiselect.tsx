"use client";

import SelectedLabel from "./selectedLabel";
import ResultRow from "./resultRow";
import { useEffect, useState, useRef } from "react";
import useFocusOnKeyPress from "./useFocusOnKeyPress";

export default function Multiselect() {
  const searchInputRef = useFocusOnKeyPress("/");
  const resultRefs = useRef<any[]>([]);
  const labelRefs = useRef<any[]>([]);
  const [focusedResultIndex, setFocusedResultIndex] = useState(-1);
  const [focusedLabelIndex, setFocusedLabelIndex] = useState(-1);

  const [searchText, setSearchText] = useState("");
  const [isTyping, setTyping] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasNoResult, setHasNoResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedData, setSelectedData] = useState<any[]>([]);

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
    setTyping(true);
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (searchText) setTyping(false);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchText]);

  useEffect(() => {
    setFocusedResultIndex(-1);
    setResults([]);

    const fetchData = async (keyword: string) => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://rickandmortyapi.com/api/character/?name=" + keyword
        );
        const result = await response.json();
        if (!result.error) {
          setResults(result.results);
        } else {
          setResults([]);
          setHasNoResult(true);
        }
      } catch (error) {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isTyping && searchText) {
      fetchData(searchText);
    }

    if (isTyping) {
      setHasNoResult(false);
    }
  }, [searchText, isTyping]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "ArrowDown") {
        setFocusedLabelIndex(-1);
        setFocusedResultIndex((prevIndex) => {
          if (prevIndex < resultRefs.current.length - 1) {
            return prevIndex + 1;
          } else {
            return prevIndex;
          }
        });
      } else if (event.key === "ArrowUp") {
        setFocusedLabelIndex(-1);
        setFocusedResultIndex((prevIndex) => {
          if (prevIndex > 0) {
            return prevIndex - 1;
          } else {
            return prevIndex;
          }
        });
      } else if (event.key === "ArrowRight") {
        setFocusedResultIndex(-1);

        setFocusedLabelIndex((prevIndex) => {
          if (prevIndex < labelRefs.current.length - 1) {
            return prevIndex + 1;
          } else {
            return prevIndex;
          }
        });
      } else if (event.key === "ArrowLeft") {
        setFocusedResultIndex(-1);
        setFocusedLabelIndex((prevIndex) => {
          if (prevIndex > 0) {
            return prevIndex - 1;
          } else {
            return prevIndex;
          }
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [results, selectedData]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Enter") {
        if (focusedResultIndex !== -1) {
          let data = results[focusedResultIndex];
          if (selectedData.some((el) => el.id == data.id)) {
            setSelectedData((prev) => prev.filter((val) => val.id !== data.id));
          } else {
            setSelectedData((prev) => [data, ...prev]);
          }
        } else if (focusedLabelIndex !== -1) {
          let data = selectedData[focusedLabelIndex];
          if (selectedData.some((el) => el.id == data.id)) {
            setSelectedData((prev) => prev.filter((val) => val.id !== data.id));
          } else {
            setSelectedData((prev) => [data, ...prev]);
          }
          setFocusedLabelIndex(-1);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const onRowSelectStatusChange = (characterData: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedData((prev) => [characterData, ...prev]);
    } else {
      setSelectedData((prev) =>
        prev.filter((val) => val.id !== characterData.id)
      );
    }
  };

  useEffect(() => {
    if (resultRefs.current[focusedResultIndex]) {
      (resultRefs.current[focusedResultIndex] as any).focus();
    }
  }, [focusedResultIndex]);

  useEffect(() => {
    if (labelRefs.current[focusedLabelIndex]) {
      (labelRefs.current[focusedLabelIndex] as any).focus();
    }
  }, [focusedLabelIndex]);

  const handleDelete = (id: number) => {
    setSelectedData((prev) => prev.filter((val) => val.id !== id));
  };

  return (
    <div className="p-5 w-[600px] relative">
      <div className="border-2 border-slate-400 rounded-xl py-3 flex bg-white">
        <div className="flex items-center gap-2 ml-2 flex-none overflow-x-auto max-w-[300px] mb-[-10px] pb-[10px]">
          {selectedData.map((el, index) => {
            return (
              <SelectedLabel
                labelRef={(el: any) => (labelRefs.current[index] = el)}
                onDelete={handleDelete}
                key={el.id}
                id={el.id}
                name={el.name}
              />
            );
          })}
        </div>
        <input
          placeholder="Search"
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          ref={searchInputRef}
          className="flex-auto mr-2 appearance-none bg-[#0000] focus:outline-none focus:bg-blue-100 rounded-xl p-2 text-slate-600"
        />
      </div>
      {searchText != "" && results.length > 0 && !isTyping ? (
        <div className="border-2 border-slate-400 rounded-xl mt-4 absolute top-20 right-[-3px] w-full h-[500px] overflow-scroll shadow-lg bg-white">
          {results?.map((result, index) => {
            const isSelected = selectedData.some((el) => el.id === result.id);
            return (
              <ResultRow
                key={`${result.id}-${isSelected}`}
                rowRef={(el: any) => (resultRefs.current[index] = el)}
                isSelected={isSelected}
                characterData={result}
                searchText={searchText}
                onChange={(checked: boolean) => {
                  onRowSelectStatusChange(result, checked);
                }}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
      {hasNoResult && (
        <div className="mt-4 text-center text-slate-500">
          No results found for <b>{searchText}</b>
        </div>
      )}
      {isLoading && (
        <div className="mt-4 text-center text-slate-500">
          Fetching results...
        </div>
      )}
    </div>
  );
}
