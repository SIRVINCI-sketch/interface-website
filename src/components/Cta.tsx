interface CtaProps {
  observe: (el: Element | null) => void;
}

export default function Cta({ observe }: CtaProps) {
  return (
    <section className="cta" id="contact">
      <div className="section-top mono">
        <span>03 / YOUR TURN</span>
        <span>OPEN FOR NEW COLLABORATIONS</span>
      </div>

      <h2 ref={observe} className="reveal">
        LET'S MAKE
        <br />
        <span>A SCENE.</span>
      </h2>

      <div className="cta-row">
        <p>
          Have something worth shaking up? Let's make it impossible to ignore.
        </p>
        <a
          className="cta-button mono"
          href="mailto:admin@scrollhaus.ai?subject=Interference%20template%20inquiry"
        >
          GET IN TOUCH <span>↗</span>
        </a>
      </div>
    </section>
  );
}
