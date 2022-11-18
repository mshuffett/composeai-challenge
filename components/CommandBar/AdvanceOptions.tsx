

import ChevronDown from '../Icons/ChevronDown';
import ZapFast from '../Icons/ZapFast';
import styles from './AdvanceOptions.module.css';

const AdvanceOptions: React.FC = () => {

    return (
        <div id={styles['advance-options-container']}>
            <div className={styles['advance-options']}>
                <ZapFast />
                <span>Advance Options</span>
            </div>
            <ChevronDown />
        </div>
    )
}


export default AdvanceOptions;

