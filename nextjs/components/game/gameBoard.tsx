import Cell from "./cell";
export default function GameBoard({
  word,
  attempts,
}: {
  word: string;
  attempts: string[];
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      {[...Array(7)].map((_, rowIndex) => (
        <div key={rowIndex} className="mb-2 flex flex-row gap-2">
          {[...Array(6)].map((_, colIndex) => (
            <Cell
              key={colIndex}
              word={word}
              ltrIdx={colIndex}
              ltr={attempts[rowIndex]?.[colIndex] || ""}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
