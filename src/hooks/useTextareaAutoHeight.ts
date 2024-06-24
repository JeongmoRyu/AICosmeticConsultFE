import { RefObject, useEffect } from 'react';

// textarea 자동 높이 조절
const useTextareaAutoHeight = (ref: RefObject<HTMLTextAreaElement>) => {
  const autoResize = (e: HTMLTextAreaElement) => {
    e.style.height = '19px';
    e.style.height = e.scrollHeight + 'px';
  };

  useEffect(() => {
    if (ref.current) {
      autoResize(ref.current);
      ref.current.addEventListener('input', () => ref.current && autoResize(ref.current));
    }
  }, [ref]);
};
export default useTextareaAutoHeight;
