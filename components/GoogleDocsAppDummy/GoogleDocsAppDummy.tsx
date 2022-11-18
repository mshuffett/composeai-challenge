import { ChangeEvent, useRef } from "react";
import useAutofocus from "../../hooks/useAutofocus";
import styles from './styles.module.css';

interface GoogleDocsAppDummyProps {
    value: string;
    onChange: (value: string) => void;
    children?: React.ReactNode;
}

const GoogleDocsAppDummy: React.FC<GoogleDocsAppDummyProps> = ({ value, onChange, children }) => {
    const inputElementRef = useRef<HTMLTextAreaElement>(null);
    useAutofocus(inputElementRef);

    const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(ev.target.value);
    }

    return (
        <div data-testid="google-docs-app" id={styles["google-docs-app"]}>
            <textarea rows={100} ref={inputElementRef} value={value} onChange={handleChange} autoFocus />
            {children}
        </div>
    )
}

export default GoogleDocsAppDummy;

