import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/data-display/card";

export function ProjectsView() {
  return (
    <Card className="glass-card" data-reveal data-reveal-visible="false">
      <CardHeader>
        <CardTitle>Projets</CardTitle>
      </CardHeader>
      <CardContent className="opacity-80">
        Mes meilleurs projets en Next.js.
      </CardContent>
    </Card>
  );
}
