import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center min-h-screen">
        <div className="btn btn-primary">Root Main Page</div>
        <div className="btn btn-secondary">
          <Link href="/dashboard"> Dashboard </Link>
        </div>
        <div className="btn btn-secondary">
          <Link href="/auth"> Auth </Link>
        </div>
      </div>
    </>
  );
}
