export const dynamic = "force-dynamic";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
            <SignIn
                routing="path"
                path="/sign-in"
                afterSignInUrl="/dashboard"
                signUpUrl="/sign-up"
            />
        </div>
    );
}
