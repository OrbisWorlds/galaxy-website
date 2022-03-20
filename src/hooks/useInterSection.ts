import * as React from 'react';

export default function useInterSection(domStore: React.RefObject<Element>, parent?: boolean): boolean {
    const [isVisible, setIsVisible] = React.useState(false);
    const [once, setOnce] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });

        if (domStore.current) observer.observe(domStore.current);

        return () => {
            if (domStore.current) observer.unobserve(domStore.current);
        };
    }, [domStore]);

    React.useEffect(() => {
        if (isVisible) {
            setOnce(true)
        }
    }, [isVisible]);

    if (parent !== undefined) {
        return parent;
    }
    return once || isVisible
}


