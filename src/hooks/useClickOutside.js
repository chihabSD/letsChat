import { useEffect } from "react";
const useClickOutside = (ref, fun) => {
  useEffect(() => {
    const listener = (e) => {
      // if we are inside the the element or does not exist
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      fun();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
};

export { useClickOutside };
