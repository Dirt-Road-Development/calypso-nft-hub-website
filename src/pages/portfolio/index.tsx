import { BigNumber, constants, ethers } from "ethers";
import { useEffect, useState } from "react";
import { erc721ABI, useAccount, useContractRead } from "wagmi";
import { PageWrapper } from "../../components/PageWrapper";
import PortfolioToken from "../../components/Portfolio/Token";
import css from "../../styles/pages/portfolio.module.css";
import { Token, ERC, ERC1155, ERC721, ERC20, isERC20, isERC721 } from "../../types";



export default function PortfolioPage() {

    const { address } = useAccount();
    const [chainName, setChainName] = useState<string>("skale-calypso");
    const [tokens, setTokens] = useState<Token[]>([]);
    
    useEffect(() => {
        if (!address || !chainName) return;
        fetch(`/api/balances/?chain=${chainName}&address=${address}`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.data;
                let tokensFound: Token[] = [];
                data.items.forEach((token: any) : void => {
                    const erc = {
                        decimals: Number(token.contract_decimals),
                        address: token.contract_address,
                        type: "erc-20"
                    } satisfies ERC;
                    /// ERC-1155
                    if (!token.contract_name) {
                        for (const nft of token.nft_data) {
                            tokensFound.push({
                                ...erc,
                                type: "erc-1155",
                                tokenBalance: BigNumber.from(nft.token_balance),
                                tokenId: BigNumber.from(nft.token_id),
                                tokenURL: nft.token_url
                            } satisfies ERC1155);
                        }
                    /// ERC-721
                    } else if (token.nft_data) {
                        for (const nft of token.nft_data) {
                            tokensFound.push({
                                ...erc,
                                type: "erc-721",
                                name: token.contract_name,
                                symbol: token.contract_ticker_symbol,
                                tokenBalance: BigNumber.from(nft.token_balance),
                                tokenId: BigNumber.from(nft.token_id),
                                tokenURL: nft.token_url
                            } satisfies ERC721);
                        }
                    } else {
                        tokensFound.push({
                            ...erc,
                            balance: ethers.utils.parseUnits(token.balance, "wei"),
                            name: token.contract_name,
                            symbol: token.contract_ticker_symbol
                        } satisfies ERC20);
                    }
                });
                setTokens(tokensFound);
            })
            .catch((err) => {
                alert("Error Loading Assets. Please Try Again")
            })
    }, [address])

    return (
        <PageWrapper useWeb3={true}>
            <div className={css.container}>
                {tokens.map((token: Token, index: number) => PortfolioToken({ token, index }))}
            </div>
        </PageWrapper>
    )
}