export type AccountType = string;
export type AccountsType = string[];
export type AddressType = string;
export type PublicKeyType = string;
export type BalanceType = {
  confirmed: number;
  unconfirmed: number;
  total: number;
};
export type NetworkType = string;

export enum WalletInfoName {
  accounts = "accounts",
  address = "address",
  publicKey = "publicKey",
  balance = "balance",
  network = "network",
}

export type WalletInfoType = {
  accounts: {
    name: WalletInfoName.accounts;
    val: AccountsType;
  };
  address: {
    name: WalletInfoName.address;
    val: AddressType;
  };
  publicKey: {
    name: WalletInfoName.publicKey;
    val: PublicKeyType;
  };
  balance: {
    name: WalletInfoName.balance;
    val: BalanceType;
  };
  network: {
    name: WalletInfoName.network;
    val: NetworkType;
  };
};
