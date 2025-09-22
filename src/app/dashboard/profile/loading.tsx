import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-32" />  {/* like a title */}
      <Skeleton className="h-4 w-64" />  {/* like a paragraph */}
      <Skeleton className="h-10 w-24" /> {/* like a button */}
    </div>
  );
}
