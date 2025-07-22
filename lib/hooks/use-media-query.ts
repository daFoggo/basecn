import * as React from "react";

/**
 * Hook linh hoạt để theo dõi media query
 * @param query - Media query string (ví dụ: "(max-width: 768px)", "(min-width: 1024px)")
 * @param defaultValue - Giá trị mặc định khi chưa có kết quả (optional)
 * @returns boolean - true nếu media query match
 */
export function useMediaQuery(query: string, defaultValue?: boolean): boolean {
  const [matches, setMatches] = React.useState<boolean>(defaultValue ?? false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

// Các hook wrapper tiện lợi
export function useIsMobile(breakpoint: number = 768) {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

export function useIsTablet(minWidth: number = 768, maxWidth: number = 1024) {
  return useMediaQuery(
    `(min-width: ${minWidth}px) and (max-width: ${maxWidth - 1}px)`
  );
}

export function useIsDesktop(breakpoint: number = 1024) {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
}

export function useIsCompact(breakpoint: number = 1200) {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

// Hook cho orientation
