import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, speedMs: number = 50) {
  const [display, setDisplay] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);
  
  useEffect(() => {
    setDisplay("");
    setIsComplete(false);
    indexRef.current = 0;
    
    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        const char = text.charAt(indexRef.current);
        setDisplay((prev) => prev + char);
        indexRef.current += 1;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speedMs);
    
    return () => clearInterval(interval);
  }, [text, speedMs]);
  
  return { display, isComplete };
}
