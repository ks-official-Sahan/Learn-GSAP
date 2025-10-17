import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLayoutEffect } from "react";
import { useEffect, useRef } from "react";

const GsapFrom = () => {
  // TODO: Implement the gsap.from() method
  const objectRef = useRef(null);

  // useGSAP(() => {
  //   // gsap.from("#green-box", {
  //   gsap.from(objectRef.current, {
  //     x: 300,
  //     rotate: 360,
  //     yoyo: true,
  //     repeat: -1,
  //     duration: 2,
  //     ease: "power1.inOut",
  //   });
  // }, []);

  // useEffect(() => {
  useLayoutEffect(() => {
    if (!objectRef.current) return;

    const anim = gsap.from(objectRef.current, {
      x: 360,
      rotate: 360,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      immediateRender: false,
    });

    anim.play(0);

    return () => {
      anim.kill();
      gsap.set(objectRef.current, { clearProps: "transform" });
    };
  }, []);

  return (
    <main>
      <h1>GsapFrom</h1>

      <p className="mt-5 text-gray-500">
        The <code>gsap.from()</code> method is used to animate
        objectRef.currentements from a new state to their current state.
      </p>

      <p className="mt-5 text-gray-500">
        The <code>gsap.from()</code> method is similar to the{" "}
        <code>gsap.to()</code> method, but the difference is that the{" "}
        <code>gsap.from()</code> method animates elements from a new state to
        their current state, while the <code>gsap.to()</code> method animates
        elements from their current state to a new state.
      </p>

      <p className="mt-5 text-gray-500">
        Read more about the{" "}
        <a
          href="https://greensock.com/docs/v3/GSAP/gsap.from()"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          gsap.from()
        </a>{" "}
        method.
      </p>

      <div className="mt-20">
        <div
          id="green-box"
          ref={objectRef}
          className="w-20 h-20 bg-green-500 rounded-lg"
        />
      </div>
    </main>
  );
};

export default GsapFrom;
