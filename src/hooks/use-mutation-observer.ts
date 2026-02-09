import { useEffect } from "react";

export const useMutationObserver = (
  ref: React.RefObject<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
) => {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new MutationObserver(callback);
    observer.observe(ref.current, options);
    return () => observer.disconnect();
  }, [callback, options, ref]);
};
