import GameClient from "../../components/game/gameClient";
import { getRandomWord } from "@/lib/db/dictionary";

export default async function Game() {
  const word = getRandomWord();
  return (
    <div>
      <main>
        {word ? (
          <GameClient initialWord={word} />
        ) : (
          <div role="alert" className="alert alert-error">
            <span>Error retrieving word. Please try again later.</span>
          </div>
        )}
      </main>
    </div>
  );
}
