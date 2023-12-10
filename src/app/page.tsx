"use client";
import { Button, CircularProgress } from "@chakra-ui/react";
import { useWallet } from "@/hooks/useWallet";
import { BasicInfo } from "@/components/BasicInfo";

export default function Page() {
  const info = useWallet();

  if (!info.unisatInstalled) {
    return (
      <Button
        onClick={() => {
          window.location.href = "https://unisat.io";
        }}
      >
        Install Unisat Wallet
      </Button>
    );
  }

  if (!info.connected) {
    console.log("connected failed");
    return <CircularProgress value={80} />;
  }
  return <BasicInfo {...info} />;
}
