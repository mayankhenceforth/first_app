'use server'

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen text-3xl font-bold">
      Home Page 
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://raw.githubusercontent.com/dariusk/corpora/master/data/plants/flowers.json?limit=10");
  const data = await res.json();

  console.log("data json:",data)

  return {
    props: {
      posts: data,
    },
  };
}
