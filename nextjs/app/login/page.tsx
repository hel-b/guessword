import LoginCard from "@/components/auth/loginCard";
import Link from "next/link";
export default function Login() {
  return (
    <main>
      <div className="hero min-h-screen bg-base-200">
        {/* <div className="hero-overlay"></div> */}
        <div className="hero-content max-w-full flex-col lg:flex-row-reverse">
          <div className="prose prose-lg text-center lg:text-left">
            <h1 className="font-bold text-nowrap">Login</h1>
            <p className="text-nowrap">
              Don&apos;t have an account?&nbsp;
              <Link className="link" href="/signup">
                Sign up here
              </Link>
              .
            </p>
          </div>
          <LoginCard />
        </div>
      </div>
    </main>
  );
}
