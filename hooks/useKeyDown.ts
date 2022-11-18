import { useCallback, useEffect } from "react";

function useKeyDown(key: string, handler: (ev: KeyboardEvent) => void, target?: HTMLElement) {

    const handleKeyPress = useCallback((ev: Event) => {
        if (isKeyboardEvent(ev) && ev.key === key)
            handler(ev);
    }, [key, handler])

    useEffect(() => {
        const _target = target ?? document;
        _target.addEventListener('keydown', handleKeyPress);
        return () => {
            _target.removeEventListener('keydown', handleKeyPress);
        }
    }, [key, handler])

}

export default useKeyDown;


function isKeyboardEvent(ev: any): ev is KeyboardEvent {
    return ev.key !== undefined;
}
