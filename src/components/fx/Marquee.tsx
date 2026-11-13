/** Bandeau défilant (décoratif, répète les domaines d'activité déjà présentés ailleurs). */
export default function Marquee({ items }: { items: string[] }) {
  const half = (
    <ul className="marquee__row">
      {items.map((t, i) => (
        <li key={t} className={i % 2 === 0 ? "is-solid" : "is-outline"}>
          {t}
          <i className="marquee__dot" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {half}
        {half}
      </div>
    </div>
  );
}
