export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((i) => (
        <details className="faq" key={i.q}>
          <summary>{i.q}</summary>
          <p>{i.a}</p>
        </details>
      ))}
    </div>
  );
}
