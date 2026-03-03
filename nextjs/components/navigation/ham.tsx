import { useId } from "react";

export default function Ham() {
  const hamId = useId();
  return (
    <label
      htmlFor={hamId}
      className="group drawer-button btn z-10 btn-circle btn-ghost"
    >
      <input id={hamId} type="checkbox" className="drawer-toggle hidden" />
      {/* Hamburger icon */}
      <div>
        {[...Array(3)].map((_, i) => (
          <span
            key={i}
            className="mx-auto my-1.5 block h-0.5 w-7 rounded bg-base-content transition group-has-checked:odd:-translate-y-2 group-has-checked:odd:-rotate-45 even:duration-200 group-has-checked:even:opacity-0 group-has-checked:first-of-type:translate-y-2 group-has-checked:first-of-type:rotate-45"
          />
        ))}
      </div>
      <span className="sr-only">Toggle Menu</span>
    </label>
  );
}
