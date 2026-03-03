import Image from "next/image";
export default function Avatar({
  iconUrl,
  name,
}: Readonly<{ iconUrl?: string; name?: string }>) {
  if (iconUrl) {
    return (
      <div className="avatar">
        <div className="w-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
          <Image
            src={iconUrl}
            alt={name || "User Avatar"}
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>
      </div>
    );
  } else {
    // take first two initial of name (if present)
    const initials = name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "";
    return (
      <div className="avatar avatar-placeholder">
        <div className="w-12 rounded-full bg-neutral text-neutral-content">
          <span>{initials}</span>
        </div>
      </div>
    );
  }
}
