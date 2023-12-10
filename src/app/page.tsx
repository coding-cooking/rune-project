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
    return <CircularProgress />;
  }
  return <BasicInfo {...info} />;
}
