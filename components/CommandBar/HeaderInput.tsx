import HelpSVG from "../Icons/HelpSVG"
import ComposeAiLogoSVG from "../Icons/ComposeAiLogoSVG"

import styles from './HeaderInput.module.css';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import useAutofocus from "../../hooks/useAutofocus";

interface HeaderInputProps {
    value: string;
    onChange: (v: string) => void;
    showHelp: boolean;
}

const HeaderInput: React.FC<HeaderInputProps> = ({ value, onChange, showHelp }) => {
    const textareaRef = useRef(null);
    useAutofocus(textareaRef)

    useAutogrowTextarea(value, textareaRef)

    const handleChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(ev.target.value);
    }, [])

    return (
        <div id={styles['command-input-container']}>
            <ComposeAiLogoSVG />
            <textarea value={value} onChange={handleChange} ref={textareaRef} />
            {showHelp && <HelpSVG />}
        </div>
    )
}

export default HeaderInput;

// Hacky solution for changing the number of rows in a `textarea` in an imperatively way
// TODO(lg): Review a more declarative solution, also fix typing
function useAutogrowTextarea(value: string, inputRef: any) {
    const minRows = 1;
    const maxRows = 10;

    useEffect(() => {
        const textareaLineHeight = 24;

        if (inputRef.current !== null) {
            const textarea = inputRef.current;
            const { rows: previousRows, scrollHeight, scrollTop } = textarea;

            textarea.rows = minRows;

            const currentRows = Math.floor(textarea.scrollHeight / textareaLineHeight);

            if (currentRows === previousRows) {
                textarea.rows = currentRows;
            }

            if (currentRows >= maxRows) {
                textarea.rows = maxRows;
                textarea.scrollTop = textarea.scrollHeight;
            }

            textarea.rows = (currentRows < maxRows ? currentRows : maxRows)
        }
    }, [value])
}
