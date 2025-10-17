import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GsapFromTo = () => {
  // TODO: Implement the gsap.fromTo() method

  const objectRef = useRef(null);

  // useGSAP(() => {
  //   gsap.fromTo(
  //     objectRef.current,
  //     {
  //       x: 50,
  //       y: 50,
  //       rotate: 45,
  //     },
  //     {
  //       x: 350,
  //       y: 0,
  //       rotate: 360,
  //       yoyo: true,
  //       repeat: -1,
  //       duration: 2,
  //       ease: "power1.inOut",
  //     }
  //   );
  // }, []);

  const animRef = useRef(null);

  // useLayoutEffect(() => {
  useIsomorphicLayoutEffect(() => {
    if (!objectRef.current) return;

    // Accessibility: honor reduced motion a11y
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Defensive: clear any lingering transform from previous runs/HMR
    gsap.set(objectRef.current, {
      clearProps: "transform,rotate,borderRadius,opacity",
    });

    if (prefersReduced) {
      // Put element in final state and avoid animation
      gsap.set(objectRef.current, {
        x: 350,
        y: 0,
        rotate: 360,
        borderRadius: "5%",
      });
      return;
    }

    objectRef.current.style.willChange = "transform, rotate, border-radius, opacity";

    const anim = gsap.fromTo(
      objectRef.current,
      {
        x: 50,
        y: 50,
        rotate: 45,
        borderRadius: "50%",
      },
      {
        x: 350,
        y: 0,
        rotate: 360,
        borderRadius: "5%",
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: "bounce.out",
      }
    );

    animRef.current = anim;

    const onVisibility = () => {
      if (!animRef.current) return;
      if (document.hidden) animRef.current.pause();
      else animRef.current.play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);

      if (animRef.current) {
        animRef.current.kill();
        animRef.current = null;
      }

      objectRef.current.style.willChange = "";
      gsap.set(objectRef.current, {
        clearProps: "transform,rotate,borderRadius,willChange,opacity",
      });
    };
  }, []);

  return (
    <main>
      <h1>GsapFromTo</h1>

      <p className="mt-5 text-gray-500">
        The <code>gsap.fromTo()</code> method is used to animate elements from a
        new state to a new state.
      </p>

      <p className="mt-5 text-gray-500">
        The <code>gsap.fromTo()</code> method is similar to the{" "}
        <code>gsap.from()</code> and <code>gsap.to()</code> methods, but the
        difference is that the <code>gsap.fromTo()</code> method animates
        elements from a new state to a new state, while the{" "}
        <code>gsap.from()</code> method animates elements from a new state to
        their current state, and the <code>gsap.to()</code> method animates
        elements from their current state to a new state.
      </p>

      <p className="mt-5 text-gray-500">
        Read more about the{" "}
        <a
          href="https://greensock.com/docs/v3/GSAP/gsap.fromTo()"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          gsap.fromTo()
        </a>{" "}
        method.
      </p>

      <div className="mt-20">
        <div
          id="red-box"
          ref={objectRef}
          className="w-20 h-20 bg-red-500 rounded-lg"
        />
      </div>
    </main>
  );
};

export default GsapFromTo;
