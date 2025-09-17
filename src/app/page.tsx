import { connectDB } from '@/lib/mongoose';
import 'server-only'

export default function Page() {
  connectDB()
  return (
    <div className="flex items-center justify-center h-screen text-3xl font-bold">
     <h1>Home Page</h1>
    </div>
  );
}

