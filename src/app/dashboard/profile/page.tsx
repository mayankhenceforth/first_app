// "use client";

// import { useEffect, useState } from "react";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function UserProfile() {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setUser({ name: "Mayank Maurya", email: "test@example.com" });
//     }, 2000); // fake API delay
//   }, []);

//   if (!user) {
//     return (
//       <div className="space-y-2">
//         <Skeleton className="h-6 w-40" />
//         <Skeleton className="h-4 w-60" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-bold">{user.name}</h2>
//       <p className="text-gray-600">{user.email}</p>
//     </div>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
