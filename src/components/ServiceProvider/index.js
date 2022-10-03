import ServiceStatus from '../ServiceStatus'

const SERVICES = {
  ARBITRUM: 'https://safe-transaction.arbitrum.gnosis.io',
  AVALANCHE: 'https://safe-transaction.avalanche.gnosis.io',
  BINANCE: 'https://safe-transaction.bsc.gnosis.io',
  EWC: 'https://safe-transaction.ewc.gnosis.io',
  GNOSISCHAIN: 'https://safe-transaction.xdai.gnosis.io',
  GOERLI: 'https://safe-transaction.goerli.gnosis.io',
  MAINNET: 'https://safe-transaction.mainnet.gnosis.io',
  OPTIMISM: 'https://safe-transaction.optimism.gnosis.io',
  POLYGON: 'https://safe-transaction.polygon.gnosis.io',
  RINKEBY: 'https://safe-transaction.rinkeby.gnosis.io',
  VOLTA: 'https://safe-transaction.volta.gnosis.io',
}


function ServiceProvider(props) {
    return (
        Object.entries(SERVICES).map(([key, value]) => (
              <ServiceStatus
                key={key}
                network={key}
                url={value}
              ></ServiceStatus>
            ))
            )

}

export default ServiceProvider