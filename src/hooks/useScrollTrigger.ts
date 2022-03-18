import * as React from 'react';

declare global {
    interface Window {
        scrollTop: number;
    }
}

function defaultTrigger(store: React.MutableRefObject<number>) {
    const disableHysteresis = false
    const threshold = 100
    const previous = store.current;

    if (window) {
        store.current = window.pageYOffset !== undefined ? window.pageYOffset : window.scrollTop;
    }

    if (!disableHysteresis && previous !== undefined) {
        if (store.current < previous) {
            return false;
        }
    }

    if (window.innerHeight > store.current) {
        return false
    }

    return store.current > threshold;
}

export default function useScrollTrigger() {
    const store = React.useRef(0);
    const [trigger, setTrigger] = React.useState(() => defaultTrigger(store));
    React.useEffect(() => {
        const handleScroll = () => {
            setTrigger(defaultTrigger(store));
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [window, defaultTrigger]);


    return trigger;
}