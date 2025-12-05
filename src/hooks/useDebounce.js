import { useEffect, useState } from "react";

export const useDebounce = (cb, time) => {
    const [debounceValue, setDebounceValue] = useState(cb);
    
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            setDebounceValue(cb);
        }, time);

        return () => {
            clearTimeout(timeout);
        };
        
    }, [cb, time]);
    return debounceValue;
}