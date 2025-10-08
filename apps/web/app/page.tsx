import { Header } from "./components/Header";
import TileGrid from "./components/TileGrid";

export default function Home() {
  return (
    <div>
      <Header />
      <div>
        <TileGrid></TileGrid>
      </div>
    </div>
  );
}
