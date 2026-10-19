export default function Ticker() {
  const text =
    'ART DIRECTION ✳ INTERACTIVE EXPERIENCES ✳ CREATIVE DEVELOPMENT ✳ MOVEMENT WITH MEANING ✳ ART DIRECTION ✳ INTERACTIVE EXPERIENCES ✳ CREATIVE DEVELOPMENT ✳ MOVEMENT WITH MEANING ✳ ';

  return (
    <div className="ticker mono" aria-hidden="true">
      <span>
        {text.split('✳').map((part, i, arr) => (
          <span key={i}>
            {part}
            {i < arr.length - 1 && <b>✳</b>}
          </span>
        ))}
      </span>
    </div>
  );
}
