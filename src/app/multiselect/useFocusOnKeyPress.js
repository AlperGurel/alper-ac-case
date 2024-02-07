import { useEffect, useRef } from "react";

function useFocusOnKeyPress(targetKey) {
  const focusRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === targetKey) {
        event.preventDefault();
        if (focusRef.current) {
          focusRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey]);

  return focusRef;
}

export default useFocusOnKeyPress;
