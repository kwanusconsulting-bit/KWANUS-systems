export const dynamic = "force-dynamic";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950">
            <SignUp routing="path" path="/sign-up" />
        </div>
    );
}
