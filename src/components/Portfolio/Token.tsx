import { isERC1155, isERC20, isERC721, Token } from "../../types";
import css from "../../styles/components/portfolio/token.module.css";
import TokenERC20 from "./ERC20";
import TokenERC1155 from "./ERC1155";
import TokenERC721 from "./ERC721";

type Props = {
    token: Token;
    index: number;
}

export default function PortfolioToken({ token, index }: Props) {
    return (
        <div key={index} className={css.container}>
            {isERC20(token) && <TokenERC20 token={token} />}
            {isERC1155(token) && <TokenERC1155 token={token} />}
            {isERC721(token) && <TokenERC721 token={token} />}
            <p className={css.tokenType}>{token.type.toUpperCase()}</p>
        </div>
    )
}