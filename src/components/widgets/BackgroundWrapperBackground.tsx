"use client";

import { useEffect, useRef } from "react";
import { styleClasses } from "../../helpers/styleClasses";
import BackgroundBlob from "./BackgroundBlob";
import styles from "./BackgroundWrapperBackground.module.scss";

const maxMove = 0.06;

export default function BackgroundWrapperBackground() {
  const backgroundRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const background = backgroundRef.current!;

    const cb = (e: MouseEvent) => handleMouseMove(e, background);
    document.addEventListener("mousemove", cb);

    return () => {
      document.removeEventListener("mousemove", cb);
    };
  }, []);

  return (
    <span className={styleClasses(styles, "background")} ref={backgroundRef}>
      <BackgroundBlob />
      <BackgroundBlob />
      <span className={styleClasses(styles, "white-glow")}></span>
    </span>
  );
}

function handleMouseMove(e: MouseEvent, background: HTMLElement) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mq.matches) return;

  for (const _element of background.children) {
    const element = _element as HTMLElement;
    const boundingbox = element.getBoundingClientRect();

    const centerX = boundingbox.x + boundingbox.width / 2;
    const centerY = boundingbox.y + boundingbox.height / 2;

    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;

    const maxMoveX = boundingbox.width * maxMove;
    const maxMoveY = boundingbox.height * maxMove;

    const relOffsetX = offsetX * (maxMoveX / window.innerWidth);
    const relOffsetY = offsetY * (maxMoveY / window.innerHeight);

    const ratioX = relOffsetX / boundingbox.width;
    const ratioY = relOffsetY / boundingbox.height;

    const transformX = ratioX * 100;
    const transformY = ratioY * 100;

    element.animate(
      { transform: `translate(${transformX}%, ${transformY}%)` },
      { duration: 200 },
    );
  }
}
