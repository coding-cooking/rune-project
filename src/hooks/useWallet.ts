import {
  AccountsType,
  AddressType,
  BalanceType,
  NetworkType,
  PublicKeyType,
  WalletInfoName,
  WalletInfoType,
} from "@/types/wallet";
import { useCallback, useEffect, useRef, useState } from "react";

export function useWallet() {
  const [unisatInstalled, setUnisatInstalled] = useState(false);
  const [connected, setConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [publicKey, setPublicKey] = useState("");
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState({
    confirmed: 0,
    unconfirmed: 0,
    total: 0,
  });
  const [network, setNetwork] = useState("livenet");

  const getBasicInfo = useCallback(async () => {
    if (typeof window.unisat !== undefined) {
      try {
        const unisat = window.unisat;
        const [address] = await unisat.getAccounts();
        setAddress(address);

        const publicKey = await unisat.getPublicKey();
        setPublicKey(publicKey);

        const balance = await unisat.getBalance();
        setBalance(balance);

        const network = await unisat.getNetwork();
        setNetwork(network);
      } catch (e) {
        console.log("connect failed");
      }
    } else {
      console.log("uniset cannot be detected");
    }
  }, []);

  const selfRef = useRef<{ accounts: string[] }>({
    accounts: [],
  });
  const self = selfRef.current;
  const handleAccountsChanged = useCallback(
    (_accounts: string[]) => {
      if (self.accounts[0] === _accounts[0]) {
        // prevent from triggering twice
        return;
      }
      self.accounts = _accounts;
      if (_accounts.length > 0) {
        setAccounts(_accounts);
        setConnected(true);

        setAddress(_accounts[0]);

        getBasicInfo();
      } else {
        setConnected(false);
      }
    },
    [getBasicInfo, self]
  );

  const handleNetworkChanged = useCallback(
    (network: string) => {
      setNetwork(network);
      getBasicInfo();
    },
    [getBasicInfo]
  );

  useEffect(() => {
    async function checkUnisat() {
      let unisat = (window as any).unisat;

      for (let i = 1; i < 10 && !unisat; i += 1) {
        await new Promise((resolve) => setTimeout(resolve, 100 * i));
        unisat = (window as any).unisat;
      }

      if (unisat) {
        setUnisatInstalled(true);
      } else if (!unisat) return;

      const accounts = await unisat.getAccounts();
      handleAccountsChanged(accounts);

      unisat.on("accountsChanged", handleAccountsChanged);
      unisat.on("networkChanged", handleNetworkChanged);

      return () => {
        unisat.removeListener("accountsChanged", handleAccountsChanged);
        unisat.removeListener("networkChanged", handleNetworkChanged);
      };
    }

    checkUnisat();
  }, [handleAccountsChanged, handleNetworkChanged]);

  return {
    unisatInstalled,
    connected,
    ...transformRes(WalletInfoName.accounts, accounts),
    ...transformRes(WalletInfoName.address, address),
    ...transformRes(WalletInfoName.publicKey, publicKey),
    ...transformRes(WalletInfoName.balance, balance),
    ...transformRes(WalletInfoName.network, network),
  } as WalletInfoType & {
    unisatInstalled: boolean;
    connected: boolean;
  };
}

const transformRes = (
  type: WalletInfoName,
  val: AccountsType | AddressType | PublicKeyType | BalanceType | NetworkType
) => ({
  [`${type}`]: {
    name: type,
    val,
  },
});
