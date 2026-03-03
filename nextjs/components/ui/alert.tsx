export default function Alert({
  message,
  type = "info",
}: {
  message: string;
  type?: "info" | "warning" | "error" | "success";
}) {
  return (
    <div
      role="alert"
      className={`alert line-clamp-2${
        type === "info"
          ? "alert-info"
          : type === "warning"
            ? "alert-warning"
            : type === "error"
              ? "alert-error"
              : "alert-success"
      } ${message ? "" : "hidden"}`}
      aria-hidden={!message}
    >
      <span>
        {message || "&nbsp;"}
        <br />
        &nbsp;
      </span>
    </div>
  );
}
