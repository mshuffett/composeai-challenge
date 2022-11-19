import { useCallback, useEffect, useMemo, useState } from 'react';
import useKeyDown from '../../hooks/useKeyDown';
import BulletList from '../Icons/BulletListSVG';
import EmailSVG from '../Icons/EmailSVG';
import HeadingSquareSVG from '../Icons/HeadingSquareSVG';
import InfoSVG from '../Icons/InfoSVG';
import LightBulbSVG from '../Icons/LightBulbSVG';
import List from '../Icons/ListSVG';
import ParagraphMultipleSVG from '../Icons/ParagraphMultipleSVG';
import ParagraphSVG from '../Icons/ParagraphSVG';
import SentenceSVG from '../Icons/SentenceSVG';
import styles from './SuggestedActions.module.css';

export interface Action {
    id: string;
    action: string;
    icon: React.ReactNode;
}

interface SuggestedActionsProps {
    value: string;
}

const SuggestedActions: React.FC<SuggestedActionsProps> = ({ value }) => {

    const actions = useFilteredActions(value);
    const preSelectedAction = usePreselectedAction(actions);

    const handleSelectAction = useCallback((action: Action) => {
        alert(`Selecting action: ${action.action}`)
    }, [preSelectedAction])

    const handlePreselectedAction = useCallback(() => {
        preSelectedAction && handleSelectAction(preSelectedAction);
    }, [handleSelectAction, preSelectedAction])

    useKeyDown('Enter', handlePreselectedAction)
    useKeyDown('Tab', handlePreselectedAction)

    return (
        <div id={styles['suggested-actions-container']}>
            <span>Type anything or...</span>
            {actions.map(action => <Action
                key={action.id}
                preselected={action.id === preSelectedAction?.id}
                action={action}
                onActionSelected={() => handleSelectAction(action)}
            />)}
        </div>
    );
}

export default SuggestedActions;

interface ActionProps {
    action: Action;
    onActionSelected: () => void;
    preselected: boolean;
}

const Action: React.FC<ActionProps> = ({ action, onActionSelected, preselected }) => {
    const actionClassNames = `${styles['suggested-action']} ${preselected ? styles['preselected'] : ''}`;
    return (
        <div onClick={onActionSelected} className={actionClassNames}>
            {action.icon}
            <span>{action.action}</span>
        </div>
    )
}


function useFilteredActions(value: string) {

    const actions: Action[] = useMemo(() => [{
        id: '1',
        action: 'outline for a...',
        icon: <List />
    }, {
        id: '2',
        action: 'bullet list on',
        icon: <BulletList />
    }, {
        id: '3',
        action: 'headline for a...',
        icon: <HeadingSquareSVG />
    }, {
        id: '4',
        action: 'paragraph about...',
        icon: <ParagraphSVG />
    },
    {
        id: '5',
        action: 'couple paragraphs about...',
        icon: <ParagraphMultipleSVG />
    },
    {
        id: '6',
        action: 'sentence about...',
        icon: <SentenceSVG />
    },
    {
        id: '7',
        action: 'few ideas for...',
        icon: <LightBulbSVG />
    },
    {
        id: '8',
        action: 'bit of information about...',
        icon: <InfoSVG />
    },
    {
        id: '9',
        action: 'email to...',
        icon: <EmailSVG />
    }], []);

    const filteredActions = useMemo(() => {
        return actions.filter((action) => {
            const filterByMatchingWords = value.split(' ');
            return filterByMatchingWords.some(word => action.action.includes(word));
        })
    }, [actions, value])

    return filteredActions;
}

function usePreselectedAction(actions: Action[]): Action | null {

    const [preselectedActionIndex, setPreselectedActionIndex] = useState(0);

    // Resets the preselected action when filtering actions
    useEffect(() => {
        if (actions.length < preselectedActionIndex) {
            setPreselectedActionIndex(0)
        }
    }, [preselectedActionIndex, setPreselectedActionIndex, actions])

    useKeyDown('ArrowUp', (ev) => {
        ev.preventDefault();
        if (preselectedActionIndex > 0) {
            setPreselectedActionIndex(i => i - 1)
        }
    })

    useKeyDown('ArrowDown', (ev) => {
        ev.preventDefault();
        if (preselectedActionIndex < actions.length - 1) {
            setPreselectedActionIndex(i => i + 1)
        }
    })


    return actions[preselectedActionIndex];
}
