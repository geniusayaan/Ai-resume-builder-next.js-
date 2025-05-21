import Link from "next/link";
import Navbar from "./(main)/Navbar";

export default function LandingPage() {
  return (



    <main className=" text-black min-h-screen px-6 py-12 md:px-20">
      {/* Hero */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Build a Resume in <span className="text-blue-600">2 Steps</span> Only
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Rs. 49 only. No sign-up hassle. Chat. Answer. Done.
        </p>
        <Link href={"/resumes"}>
        <button className="mt-8 px-8 py-4 text-lg bg-black text-white rounded-full hover:bg-gray-800">
          Start Building Now
        </button>
        </Link>
      </section>

      {/* Why build with us */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Why Build With Us?</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-gray-100 p-6 rounded-xl w-72 text-center shadow-md">
            <h3 className="text-xl font-bold mb-2">AI Does the Work</h3>
            <p>No templates. Just tell us about you — we'll write it perfectly.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl w-72 text-center shadow-md">
            <h3 className="text-xl font-bold mb-2">Beginner Friendly</h3>
            <p>Made for students and freshers with zero resume experience.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl w-72 text-center shadow-md">
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p>Build and download a resume within 5 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Common Mistakes and Solutions */}
      <section className="mb-20">
        <h2 className="text-3xl font-semibold text-center mb-10">10 Resume Mistakes Beginners Make (And How GenieResumay Fixes Them)</h2>
        <ul className="space-y-6 max-w-3xl mx-auto text-base leading-relaxed">
          <li><strong>1. Don't know what to write:</strong> Genie chats with you and asks exactly what's needed.</li>
          <li><strong>2. Add too much or too little:</strong> Genie filters what's relevant.</li>
          <li><strong>3. Confused by templates:</strong> No templates. Just questions and results.</li>
          <li><strong>4. Bad formatting:</strong> Clean, minimal professional design, always.</li>
          <li><strong>5. Grammar issues:</strong> AI writes and checks for you.</li>
          <li><strong>6. Forgetting sections:</strong> We walk you through every section — nothing missed.</li>
          <li><strong>7. Including fluff:</strong> Genie highlights only achievements that matter.</li>
          <li><strong>8. No summary or headline:</strong> We auto-write one that fits your goals.</li>
          <li><strong>9. Unclear structure:</strong> Your resume is clean, one-page, and focused.</li>
          <li><strong>10. Not knowing how to start:</strong> Just click “Start” and talk. Genie handles the rest.</li>
        </ul>
      </section>

      {/* Featured In (Optional) */}
      <section className="mb-16 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">Featured In</h2>
        <div className="flex justify-center gap-10 opacity-80">
          <span className="font-bold">Forbes</span>
          <span className="font-bold">Bloomberg</span>
          <span className="font-bold">NYT</span>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center mt-24">
        <h3 className="text-2xl font-semibold mb-4">Ready to Build Your Resume?</h3>
        <button className="bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700">
          Start Now — Only Rs. 49
        </button>
      </section>
    </main>
  );
}
