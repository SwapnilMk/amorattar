import { useEffect, useRef, useCallback, useState } from 'react';

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  loading,
  threshold = 100
}: UseInfiniteScrollOptions) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          setIsIntersecting(entry.isIntersecting);

          if (entry.isIntersecting && hasMore && !loading) {
            onLoadMore();
          }
        },
        {
          rootMargin: `${threshold}px`
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore, onLoadMore, threshold]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { lastElementRef, isIntersecting };
};
