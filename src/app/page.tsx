import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Welcome to our homepage" />
      </Head>
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-center">Home Page</h1>
      </div>
    </>
  );
}