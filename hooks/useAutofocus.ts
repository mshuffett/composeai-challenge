import { Ref, RefObject, useEffect, useRef } from "react";

type FocusableElement = HTMLInputElement | HTMLTextAreaElement;

function useAutofocus<E extends FocusableElement>(focusable: RefObject<E>) {
    useEffect(() => {
        if (focusable.current !== null) {
            focusable.current.focus();
        }
    }, []);
}

export default useAutofocus;