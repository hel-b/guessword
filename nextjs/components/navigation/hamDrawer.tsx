export default function HamDrawer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="group drawer">
      <input id="drawer-menu" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content z-100">
        {/* Page content here */}
        <label
          htmlFor="drawer-menu"
          className="btn btn-circle btn-lg btn-ghost drawer-button"
        >
          {/* Hamburger icon */}
          <div>
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="mx-auto my-1.5 block h-0.5 w-7 rounded bg-base-content transition group-has-checked:odd:-translate-y-2 group-has-checked:odd:-rotate-45 group-has-checked:even:opacity-0 even:duration-200 group-has-checked:first-of-type:translate-y-2 group-has-checked:first-of-type:rotate-45"
              />
            ))}
          </div>
          <span className="sr-only">Toggle Menu</span>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer-menu"
          aria-label="close sidebar"
          className="drawer-overlay"
        >
          {children}
        </label>
      </div>
    </div>
  );
}
