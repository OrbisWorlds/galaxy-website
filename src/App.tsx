import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { TxFailedPopup } from "./components/tx";
import { TxBroadcasting } from "./components/tx/txBroadcasting";
import { TxSuccessfulPopup } from "./components/tx/txSuccessfulPopup";
import Airdrop from "./pages/airdrop";
import AirdropClaim from "./pages/airdrop-claim";
//pages
import Main from "./pages/main";
import Nft from "./pages/nft";
import Stake from "./pages/stake";
import Story from "./pages/story";
import Vote from "./pages/vote";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/nft" element={<Nft />} />
        <Route path="/story" element={<Story />} />
        <Route path="/stake" element={<Stake />} />
        <Route path="/airdrop/claim" element={<Story />} />
        <Route path="/airdrop" element={<Airdrop />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/" element={<Main />} />
      </Routes>
      <TxBroadcasting />
      <TxSuccessfulPopup />
      <TxFailedPopup />
    </>
  );
}
