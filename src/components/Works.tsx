import { SEQ_FRAME_080, SEQ_FRAME_235, SEQ_FRAME_395 } from '../lib/assets';

interface WorksProps {
  observe: (el: Element | null) => void;
}

const cards = [
  {
    img: SEQ_FRAME_080,
    alt: 'Close detail of a moving multicolour sphere',
    label: '01 / THE PULSE',
    title: 'A LIVING SIGNAL',
  },
  {
    img: SEQ_FRAME_235,
    alt: 'Electric pink and turquoise visual pattern',
    label: '02 / THE SHIFT',
    title: 'COLOUR IN MOTION',
  },
  {
    img: SEQ_FRAME_395,
    alt: 'Abstract colourful particles forming a sphere',
    label: '03 / THE AFTERIMAGE',
    title: 'STAY A LITTLE LONGER',
  },
];

const lineup = [
  { name: 'ART DIRECTION', num: '01' },
  { name: 'INTERACTION', num: '02' },
  { name: 'MOTION', num: '03' },
  { name: 'CREATIVE CODE', num: '04' },
];

export default function Works({ observe }: WorksProps) {
  return (
    <section className="works" id="work">
      <div className="section-top mono">
        <span>02 / SELECTED FREQUENCIES</span>
        <span>THE SAME SIGNAL. THREE WAYS TO SEE IT.</span>
      </div>

      <div ref={observe} className="works-title reveal">
        <h2>
          THE
          <br />
          UNEXPECTED.
        </h2>
        <small className="mono">
          EXPERIMENTS IN MOTION, TEXTURE
          <br />
          AND BEAUTIFULLY CONTROLLED CHAOS.
        </small>
      </div>

      <div className="cards">
        {cards.map((card, i) => (
          <article key={i} ref={observe} className="card reveal">
            <img loading="lazy" src={card.img} alt={card.alt} />
            <div className="card-overlay">
              <div>
                <span className="mono">{card.label}</span>
                <br />
                <strong>{card.title}</strong>
              </div>
              <i>↗</i>
            </div>
          </article>
        ))}
      </div>

      <div className="lineup mono">
        {lineup.map((item) => (
          <div key={item.num}>
            <span>{item.name}</span>
            <b>{item.num}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
