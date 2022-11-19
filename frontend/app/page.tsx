import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center min-h-screen">
        <div className="bg-white text-center px-5 py-3 rounded-lg">
          Root Main Page
        </div>
        <div className="bg-white text-center px-5 py-3 rounded-lg">
          <Link href="/dashboard"> Dashboard </Link>
        </div>
        <div className="bg-white text-center px-5 py-3 rounded-lg">
          <Link href="/auth"> Auth </Link>
        </div>
      </div>
    </>
  );
}
