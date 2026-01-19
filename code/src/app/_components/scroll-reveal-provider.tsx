"use client";

import * as React from "react";

const DEFAULT_THRESHOLD = 0.2;
const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";
const START_DELAY_MS = 500;
const IDLE_TIMEOUT_MS = 1000;

const shouldRevealOnce = (element: HTMLElement) =>
  element.dataset.revealOnce !== "false";

export function ScrollRevealProvider() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const elements = new Set<HTMLElement>();
    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    let cancelled = false;

    const setInitialVisibility = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const isInView = rect.bottom > 0 && rect.top < window.innerHeight;
      element.setAttribute("data-reveal-visible", isInView ? "true" : "false");
    };

    const collect = (root: ParentNode) => {
      root
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          if (elements.has(element)) return;
          elements.add(element);
          setInitialVisibility(element);
          if (observer) {
            observer.observe(element);
          }
        });
    };

    const start = () => {
      if (cancelled || prefersReducedMotion) return;
      if (!document.body) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              target.setAttribute("data-reveal-visible", "true");
              if (shouldRevealOnce(target)) {
                observer?.unobserve(target);
              }
            } else if (!shouldRevealOnce(target)) {
              target.setAttribute("data-reveal-visible", "false");
            }
          });
        },
        {
          threshold: DEFAULT_THRESHOLD,
          rootMargin: DEFAULT_ROOT_MARGIN,
        },
      );

      collect(document.body);
      document.body.setAttribute("data-reveal-ready", "true");

      mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            if (node.matches("[data-reveal]")) {
              collect(node.parentNode ?? document.body);
            } else if (node.querySelector("[data-reveal]")) {
              collect(node);
            }
          });
        });
      });

      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    };

    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: {timeout: number},
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const scheduleStart = () => {
      const scheduleIdle = () => {
        if (idleWindow.requestIdleCallback) {
          const handle = idleWindow.requestIdleCallback(start, {
            timeout: IDLE_TIMEOUT_MS,
          });
          return () => idleWindow.cancelIdleCallback?.(handle);
        }

        const handle = window.setTimeout(start, START_DELAY_MS);
        return () => window.clearTimeout(handle);
      };

      if (document.readyState === "complete") {
        return scheduleIdle();
      }

      let cancelIdle: (() => void) | undefined;
      const handleLoad = () => {
        cancelIdle = scheduleIdle();
      };

      window.addEventListener("load", handleLoad, {once: true});

      return () => {
        window.removeEventListener("load", handleLoad);
        cancelIdle?.();
      };
    };

    const cancelSchedule = scheduleStart();

    return () => {
      cancelled = true;
      cancelSchedule?.();
      observer?.disconnect();
      mutationObserver?.disconnect();
      elements.clear();
      document.body?.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
