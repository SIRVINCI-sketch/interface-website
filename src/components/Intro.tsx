interface IntroProps {
  observe: (el: Element | null) => void;
}

export default function Intro({ observe }: IntroProps) {
  return (
    <section className="intro" id="idea">
      <div className="section-top mono">
        <span>01 / OUR POINT OF VIEW</span>
        <span>NOT MADE FOR EVERYONE. MADE TO MATTER.</span>
      </div>

      <h2 ref={observe} className="reveal">
        IF IT FEELS
        <br />
        <span>DIFFERENT,</span>
        <br />
        IT'S WORKING.
      </h2>

      <div ref={observe} className="intro-bottom reveal">
        <p>
          We're a small creative studio obsessed with the moment a screen stops
          feeling like a screen.
        </p>
        <a className="round-arrow" href="#work" aria-label="Explore our work">
          ↗
        </a>
      </div>
    </section>
  );
}
