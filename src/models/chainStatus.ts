type chainStatus = {
  currentBlockNumber: number;
  erc20BlockNumber: number;
  erc20Synced: boolean;
  masterCopiesBlockNumber: number;
  masterCopiesSynced: boolean;
  synced: boolean;
};

export default chainStatus;
