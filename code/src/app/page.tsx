import { hello } from "@/lib/hello";

export default function Home(){
  return <main style={{ padding: 24}}>{hello()}</main>
}
