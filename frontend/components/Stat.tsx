export default function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <>
      <div className="stats shadow-md">
        <div className="stat">
          <div className="stat-title">{title}</div>
          <div className="stat-value text-primary">{value}</div>
        </div>
      </div>
    </>
  );
}
