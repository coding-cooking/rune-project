export declare global {
  interface Window {
    unisat: {
      getAccounts: () => Promise<string[]>;
      getNetwork: () => Promise<string>;
      getPublicKey: () => Promise<string>;
      getBalance: () => Promise<{
        confirmed: number;
        unconfirmed: number;
        total: number;
      }>;
    };
  }
}
