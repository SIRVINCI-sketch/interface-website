export default function Nav() {
  return (
    <nav className="nav" aria-label="Main navigation">
      <a className="logo" href="#top" aria-label="Interference home">
        INTERFERENCE<span>®</span>
      </a>
      <div className="nav-right mono">
        <a href="#idea">The idea</a>
        <a href="#work">The work</a>
        <a className="nav-cta" href="#contact">
          START A PROJECT ↗
        </a>
      </div>
    </nav>
  );
}
