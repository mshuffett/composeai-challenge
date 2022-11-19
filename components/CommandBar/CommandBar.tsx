import { useState } from 'react';
import AdvanceOptions from './AdvanceOptions';
import styles from './CommandBar.module.css';
import HeaderInput from './HeaderInput';
import SuggestedActions from './SuggestedActions';
import Tips from './Tips';

const defaultInputValue = 'Write a ';

const CommandBar: React.FC = () => {
    const [value, setValue] = useState(defaultInputValue);

    const handleValueChange = (newValue: string) => {
        if (newValue.startsWith(defaultInputValue)) {
            setValue(newValue);
        }
    }

    return (
        <div data-testid="command-bar" id={styles['command-bar']}>
            <HeaderInput showHelp={value.length === defaultInputValue.length} value={value} onChange={handleValueChange} />
            <SuggestedActions value={value.replace(defaultInputValue, '')} />
            {value.length !== defaultInputValue.length && <Tips />}
            <AdvanceOptions />
        </div>
    )
}


export default CommandBar;

