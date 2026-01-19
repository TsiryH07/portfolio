"use client";

import * as React from "react";

const SCROLL_THRESHOLD = 2;

const getDocumentHeight = () => {
  const {body, documentElement} = document;
  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    documentElement.scrollHeight,
    documentElement.offsetHeight,
    documentElement.clientHeight,
  );
};

export function ScrollBlurOverlay() {
  const [topVisible, setTopVisible] = React.useState(false);
  const [bottomVisible, setBottomVisible] = React.useState(false);

  const updateVisibility = React.useCallback(() => {
    const scrollTop = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const documentHeight = getDocumentHeight();

    const showTop = scrollTop > SCROLL_THRESHOLD;
    const showBottom =
      scrollTop + viewportHeight < documentHeight - SCROLL_THRESHOLD;

    setTopVisible((current) => (current === showTop ? current : showTop));
    setBottomVisible((current) =>
      current === showBottom ? current : showBottom,
    );
  }, []);

  React.useEffect(() => {
    let frameId = 0;

    const onScroll = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [updateVisibility]);

  return (
    <>
      <div
        className="scroll-blur-overlay scroll-blur-overlay--top"
        data-visible={topVisible ? "true" : "false"}
      />
      <div
        className="scroll-blur-overlay scroll-blur-overlay--bottom"
        data-visible={bottomVisible ? "true" : "false"}
      />
    </>
  );
}
