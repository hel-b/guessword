import Ham from './ham';

export default function HamDropDown({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="group dropdown">
      <Ham />
      <div className="dropdown-content visible! z-10 transform-none! transition group-has-[input.peer:not(:checked)]:hidden group-has-[input.peer:checked]:opacity-100 group-has-[input.peer:not(:checked)]:delay-150">
        {children}
      </div>
    </div>
  );
}
