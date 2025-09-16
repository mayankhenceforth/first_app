export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-gray-700 leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Cinema 🎬</span> — your
          ultimate destination for booking movie tickets with ease. Our mission
          is to make your movie-going experience smooth, enjoyable, and
          hassle-free. Whether you’re catching the latest blockbuster or an
          indie gem, we’ve got you covered.
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          We aim to provide fast, secure, and user-friendly booking so you can
          spend less time waiting in line and more time enjoying the show. With
          features like real-time seat selection, instant booking, and digital
          tickets, movie night has never been this easy!
        </p>

        <p className="text-gray-600 text-sm">
          Built with ❤️ using Next.js, React, and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
