export default function Cell({
  ltr = "",
  word,
  ltrIdx,
}: {
  ltr?: string;
  word: string;
  ltrIdx: number;
}) {
  let status = "absent";
  if (!ltr) {
    status = "empty";
  } else if (word[ltrIdx] === ltr) {
    status = "match";
  } else if (word.includes(ltr)) {
    status = "present";
  }
  return (
    <div
      data-status={status}
      className="alert flex size-8 items-center justify-center rounded-sm text-lg font-extrabold data-[status=absent]:alert-error data-[status=empty]:bg-neutral-400/50 data-[status=match]:alert-success data-[status=present]:alert-warning md:h-16 md:w-16"
    >
      {ltr}
    </div>
  );
}
