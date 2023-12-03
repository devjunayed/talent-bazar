import { useEffect, useRef } from "react";

const useDocumentTitle = (title, prevailOnUnmount = false) => {
    const defaultTitle = useRef(document.title);

    useEffect(()=>{
        document.title = title;
    }, [title]);

    useEffect(()=>()=>{
        if(!prevailOnUnmount){
            document.title = defaultTitle.current;
        }
    }, [prevailOnUnmount]);
};

export default useDocumentTitle;