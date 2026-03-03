import SignUpCard from "@/components/auth/signUpCard";
import Link from "next/link";
export default function SignUp() {
  return (
    <div>
      <main>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content max-w-full flex-col lg:flex-row-reverse">
            <div className="prose prose-lg text-center lg:text-left">
              <h1 className="font-bold text-nowrap">Sign Up</h1>
              <p className="text-nowrap">
                Have an account?&nbsp;
                <Link className="link" href="/login">
                  Sign in here
                </Link>
                .
              </p>
            </div>
            <SignUpCard />
          </div>
        </div>
      </main>
    </div>
  );
}
