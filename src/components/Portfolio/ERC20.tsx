import { ERC20, isERC20, Token } from "../../types";
import css from "../../styles/components/portfolio/token.module.css";
import { ethers } from "ethers";

type Props = {
    token: ERC20;
}

export default function TokenERC20({ token }: Props) {
    return (
        <div className={css.erc20}>
            <p>{ethers.utils.formatEther(token.balance).substring(0, 10)} {token.symbol}</p>
            <p className={css.tokenName}>{token.name}</p>
        </div>
    )
}