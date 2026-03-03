import Link from "next/link";
import { FaQuestion } from "react-icons/fa";

export default function Home() {
  return (
    <div>
      <main>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col max-lg:text-center">
            {/* <FaQuestion className="m-42 size-36 lg:size-48 lg:self-start" /> */}
            <div className="prose prose-lg">
              <h1>GuessWord</h1>
              <p>
                An exciting word-guessing game that challenges your vocabulary
                and deduction skills. This Wordle-inspired game offers endless
                fun as you try to guess the hidden 6-letter word in seven
                attempts.
              </p>
              <Link className="not-prose btn btn-lg btn-primary" href="/game">
                Start Playing
              </Link>
              <p>
                Or,{" "}
                <Link className="link" href="/login">
                  Log In
                </Link>{" "}
                for more features
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
