import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const GsapStagger = () => {
  // TODO: Implement the gsap.stagger() method

  const boxesRef = useRef([]);
  // const boxContainerRef = useRef(null);

  // clear refs on rerender for better performance
  boxesRef.current = [];
  // boxContainerRef.current = null;

  useIsomorphicLayoutEffect(() => {
    if (!boxesRef.current.length) return;
    // if (!boxContainerRef.current) return;

    // const anim = gsap.to(".stagger-box", {
    // const anim = gsap.to(boxContainerRef.current.children, {
    const anim = gsap.to(boxesRef.current, {
      y: 250,
      rotate: 360,
      borderRadius: "100%",
      repeat: -1,
      yoyo: true,
      duration: 2,
      // ease: "power1.inOut",
      // stagger: 0.5,
      stagger: {
        amount: 1.5,
        grid: [2, 1],
        axis: "y",
        ease: "circ.inOut",
        from: "center",
      },
    });

    const onVisibility = () => {
      if (document.hidden) anim.pause();
      else anim.play();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      anim.kill();
    };
  }, []);

  // useGSAP(() => {
  //   gsap.to(".stagger-box", {
  //     y: 250,
  //     rotate: 360,
  //     borderRadius: "100%",
  //     repeat: -1,
  //     yoyo: true,
  //     duration: 2,
  //     stagger: 0.5,
  //   });
  // }, []);

  return (
    <main>
      <h1>GsapStagger</h1>

      <p className="mt-5 text-gray-500">
        GSAP stagger is a feature that allows you to apply animations with a
        staggered delay to a group of elements.
      </p>

      <p className="mt-5 text-gray-500">
        By using the stagger feature in GSAP, you can specify the amount of time
        to stagger the animations between each element, as well as customize the
        easing and duration of each individual animation. This enables you to
        create dynamic and visually appealing effects, such as staggered fades,
        rotations, movements, and more.
      </p>

      <p className="mt-5 text-gray-500">
        Read more about the{" "}
        <a
          href="https://gsap.com/resources/getting-started/Staggers"
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          Gsap Stagger
        </a>{" "}
        feature.
      </p>

      <div className="mt-20">
        <div
          className="flex gap-5"
          // ref={boxContainerRef}
          id="box-container"
        >
          {/* <div className="w-20 h-20 bg-indigo-200 rounded-lg stagger-box" />
          <div className="w-20 h-20 bg-indigo-300 rounded-lg stagger-box" />
          <div className="w-20 h-20 bg-indigo-400 rounded-lg stagger-box" />
          <div className="w-20 h-20 bg-indigo-500 rounded-lg stagger-box" />
          <div className="w-20 h-20 bg-indigo-600 rounded-lg stagger-box" />
          <div className="w-20 h-20 bg-indigo-700 rounded-lg stagger-box" />
          <div className="w-20 h-20 bg-indigo-800 rounded-lg stagger-box" /> */}
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              ref={(element) => {
                // boxesRef.current.push(element);
                if (element && !boxesRef.current.includes[element])
                  boxesRef.current.push(element);
              }}
              className={`w-20 h-20 bg-indigo-${
                200 + i * 100
              } rounded-lg stagger-box`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default GsapStagger;
