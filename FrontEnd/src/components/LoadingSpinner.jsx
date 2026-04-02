import { Loader2 } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-accent animate-spin" />
    </div>
  );
}
