import {getHomePageViewModel} from "../server/get-home-page-view-model";
import {HomePageView} from "./home-page-view";

export async function HomePage() {
  const data = await getHomePageViewModel();

  return <HomePageView {...data} />;
}
