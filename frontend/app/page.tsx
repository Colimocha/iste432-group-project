import { getVoters } from '#/lib/api/voter';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
        <div className="btn-primary btn">Root Main Page</div>
        <div className="btn-secondary btn">
          <Link href="/dashboard"> Dashboard </Link>
        </div>
        <div className="btn-secondary btn">
          <Link href="/auth"> Auth </Link>
        </div>
      </div>
    </>
  );
}
