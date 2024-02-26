"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { styleClasses } from "../../helpers/styleClasses";
import styles from "./FixedBanner.module.scss";

type Props = {
  className?: string;
  children?: ReactNode;
};

export default function FixedBanner({ children, className }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const banner = bannerRef.current!;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(!entry.isIntersecting && entry.boundingClientRect.top <= 0);
    });
    observer.observe(banner);

    return () => {
      observer.unobserve(banner);
    };
  }, []);

  return (
    <>
      <div
        className={styleClasses(styles, "banner", className || "")}
        ref={bannerRef}
      >
        {children}
      </div>

      <div
        className={styleClasses(styles, "banner", className || "", "fixed")}
        data-visible={isVisible}
        aria-hidden="true"
      >
        {children}
      </div>
    </>
  );
}
