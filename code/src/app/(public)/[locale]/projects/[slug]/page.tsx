import {ProjectDetailPage} from "@/features/projects";

export default async function Page({
  params,
}: {
  params: Promise<{slug: string}>;
}) {
  const {slug} = await params;

  return <ProjectDetailPage slug={slug} />;
}
