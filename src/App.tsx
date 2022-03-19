import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Airdrop from "./pages/airdrop";
//pages
import Main from "./pages/main";
import Nft from "./pages/nft";
import Stake from "./pages/stake";
import Story from "./pages/story";
import Vote from "./pages/vote";

export default function App() {
  return (
    <Routes>
      <Route path="/nft" element={<Nft />} />
      <Route path="/story" element={<Story />} />
      <Route path="/stake" element={<Stake />} />
      <Route path="/airdrop" element={<Airdrop />} />
      <Route path="/vote" element={<Vote />} />
      <Route path="/" element={<Main />} />
    </Routes>
  );
}
