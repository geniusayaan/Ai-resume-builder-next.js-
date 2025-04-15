import { SignIn } from "@clerk/nextjs";
export default function page() {
  return (
    <main className="flex   w-full h-screen items-center   justify-center bg-black p-5">
        <SignIn/>
    </main>
  );
}
