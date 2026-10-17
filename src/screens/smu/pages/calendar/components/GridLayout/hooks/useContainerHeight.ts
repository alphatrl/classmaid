import React from 'react';

/** Content-box height of the element in `ref`, kept up to date on resize */
export function useContainerHeight(
  ref: React.RefObject<HTMLElement | null>
): number {
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (node == null) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setHeight(Math.round(entry.contentRect.height));
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return height;
}
