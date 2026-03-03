export default function ToolTip({
  children,
  icon,
}: Readonly<{
  children: React.ReactNode;
  icon: React.ReactElement;
}>) {
  return (
    <div className="group dropdown dropdown-end dropdown-top">
      <label className="group swap pt-1.5 pb-2">
        <input type="checkbox" className="peer" name="swap-check" />
        {icon}
      </label>
      {/* <div className="tip-arrow absolute top-0 left-[calc(50%-4px)] z-20 size-0 border-x-4 border-t-4 border-x-transparent border-t-base-content transition-opacity group-has-[input.peer:checked]:opacity-100 group-has-[input.peer:not(:checked)]:hidden group-has-[input.peer:not(:checked)]:delay-100"></div> */}
      <div className="dropdown-content -right-2! z-10 transform-none! rounded-md border border-b-[3px] border-base-content bg-base-100 px-2 pb-0.5 text-nowrap shadow-[0.1rem_0.1rem_0.13rem_0.13rem_rgba(55,55,55,0.35)] transition-opacity group-has-[input.peer:checked]:opacity-100 group-has-[input.peer:not(:checked)]:hidden dark:shadow-[0.1rem_0.1rem_0.13rem_0.13rem_rgba(110,110,110,0.35)]">
        {children}
        <div className="tip-arrow absolute right-3! -bottom-1.5 size-0 border-x-6 border-t-6 border-x-transparent border-t-base-content"></div>
      </div>
    </div>
  );
}
