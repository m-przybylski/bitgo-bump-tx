import { BitGo } from "bitgo";
import { config } from 'dotenv'
import minimist from 'minimist'

config()

const token = process.env.TOKEN
const walletId = process.env.WALLET_ID

const isTest = true

const bitgo = new BitGo({
  accessToken: token,
  env: "test",
  userAgent: "fake-something",
});
var argv = minimist(process.argv.slice(2));
const txId = argv['tx']
console.log('transaction to bump:', txId)

async function run() {
  const coin = isTest ? 'tbtc' : 'btc'
  const wallet = await bitgo.coin(coin).wallets().get({ id: walletId })
  try {
    const result = await wallet.accelerateTransaction({ 
      cpfpTxIds: [txId], 
      cpfpFeeRate: 200, 
      maxFee: 6000 
    })
    console.log({result})
  } catch (ex) {
    console.error({ex})
  }
}

run()
