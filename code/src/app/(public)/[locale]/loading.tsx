import {Spinner} from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Spinner size="lg" className="text-muted-foreground" />
    </div>
  );
}
