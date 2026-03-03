export default function Card({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="card prose shrink-0 bg-base-100 shadow-2xl">
      <div className="card-body">{children}</div>
    </div>
  );
}
