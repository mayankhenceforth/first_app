export default function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-8">
          About Cinema 🎬
        </h1>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Welcome to <span className="font-semibold">Cinema</span>, your ultimate
          destination for booking movie tickets online with ease. Our platform
          ensures a smooth, enjoyable, and hassle-free movie-going experience.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mb-6 text-left">
          <span className="font-semibold">With Cinema, you can:</span>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Browse the latest blockbusters and classic films.</li>
            <li>Choose your favorite seats in real-time.</li>
            <li>Securely book tickets with multiple payment options.</li>
            <li>Receive instant digital tickets, ready to scan at the theater.</li>
            <li>Get notifications about upcoming movies, offers, and discounts.</li>
          </ul>
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mb-6">
          Our mission is to make movie nights more accessible and enjoyable
          for everyone, whether you’re a casual viewer or a true cinephile.
          By leveraging modern technologies like <span className="font-semibold">Next.js</span> 
          and <span className="font-semibold">Tailwind CSS</span>, we deliver a fast, responsive, 
          and user-friendly experience across all devices.
        </p>

        <p className="text-gray-700 leading-relaxed text-lg mb-6 text-left">
          <span className="font-semibold">We are committed to providing:</span>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Real-time seat availability updates.</li>
            <li>Secure and seamless payment processing.</li>
            <li>24/7 customer support for any booking issues.</li>
            <li>Personalized recommendations and movie alerts.</li>
          </ul>
        </p>

        <p className="text-gray-600 text-sm mt-6">
          Built with ❤️ using Next.js, React, Tailwind CSS, and modern web technologies.
          We strive to make every movie experience unforgettable!
        </p>
      </div>
    </div>
  );
}
