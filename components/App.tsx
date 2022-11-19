import { useEffect, useState } from 'react';
import CommandBar from './CommandBar/CommandBar';
import GoogleDocsAppDummy from './GoogleDocsAppDummy/GoogleDocsAppDummy'

const App = () => {
    const [value, setValue] = useState('');

    const showCommandBar = useShouldShowCommandBar(value);
    return (
        <GoogleDocsAppDummy value={value} onChange={setValue}>
            {showCommandBar && <CommandBar />}
        </GoogleDocsAppDummy>
    )
}

export default App;

function useShouldShowCommandBar(value: string) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(value.includes('//'))
    }, [value])
    return show;
}
