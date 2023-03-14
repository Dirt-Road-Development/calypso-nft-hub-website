import { ethers } from 'ethers';

export default async function GetBalances(
  request: any,
  res: any,
) {
  const { address, chain } = request.query;
  const covalentResponse = await fetch(`https://api.covalenthq.com/v1/${chain}/address/${ethers.utils.getAddress(address)}/balances_v2/?key=${process.env.COVALENT_API_KEY as string}&nft=true`);
  const json = await covalentResponse.json();
  return res.status(200).send(json);
}