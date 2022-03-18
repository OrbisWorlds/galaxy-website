import React from "react";

interface Props {
  children?: React.ReactNode | undefined;
}

export default function InterSection(props: Props) {
  const [isVisible, setIsVisible] = React.useState(false);
  const domStore = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });

    if (domStore.current) observer.observe(domStore.current);

    return () => {
      if (domStore.current) observer.unobserve(domStore.current);
    };
  }, [domStore]);

  return (
    <div
      ref={domStore}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {props.children}
    </div>
  );
}
