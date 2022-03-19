import * as React from 'react';

export default function useInterSection(domStore: React.RefObject<Element>): boolean {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });

        if (domStore.current) observer.observe(domStore.current);

        return () => {
            if (domStore.current) observer.unobserve(domStore.current);
        };
    }, [domStore]);

    return isVisible
}


