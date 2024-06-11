// we build the block template from the tx template
function getBlockExplorerHref(
  blockExplorerTxTemplate: string,
  blockNumber?: number,
): string {
  const transactionTemplate = "/tx/{{txHash}}";
  const blockTemplate = `/block/${blockNumber}`;

  return blockExplorerTxTemplate
    .replace(transactionTemplate, blockTemplate)
    .replace("internal-", ""); // required for EWC & Volta chain
}

export default getBlockExplorerHref;
