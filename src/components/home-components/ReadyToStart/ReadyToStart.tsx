import SectionBlock from "@/src/components/SectionBlock/SectionBlock";
import Link from "next/link";

function ReadyToStart() {
  return (
    <section id="ready-to-start">
      <SectionBlock dark>
        <div className="ready-to-start">
          <div className="ready-to-start__content d-flex flex-column gap-4 justify-content-center align-items-center text-center">
            <h2>Ready to Start Your Cinematic Journey?</h2>
            <p>
              Join a community of enthusiasts who appreciate the craft of
              storytelling. Free to start, forever cinematic.
            </p>
               <Link href="/login" className="btn primary m-auto">Join CineVault Now</Link>
          </div>
        </div>
      </SectionBlock>
    </section>
  );
}

export default ReadyToStart;
