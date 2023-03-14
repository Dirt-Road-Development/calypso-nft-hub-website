import { ERC721, isERC721, Token } from "../../types";
import css from "../../styles/components/portfolio/token.module.css";
import { useEffect, useState } from "react";
import { URL } from "url";

type Props = {
    token: ERC721;
}

export default function TokenERC721({ token }: Props) {

    const [image, setImage] = useState<URL>();

    useEffect(() => {
        try {
            let _ = token.tokenURL;
            if (token.tokenURL.includes("ipfs://")) {
                _ = `https://cf-ipfs.com/ipfs/${token.tokenURL.split("ipfs://")[1]}`;
            }
            const url = new URL(token.tokenURL);
            setImage(url);
        } catch (err) {}
    }, [token.tokenURL]);

    return (
        <div className={css.erc721}>
            <p className={css.tokenId}># {token.tokenId.toString()}</p>
            {image ? <img src={token.tokenURL} alt={token.name} /> : (
                <>
                    <p className={css.tokenName}>{token.name}</p>
                    <p className={css.tokenName}>{token.symbol}</p>
                </>
            )}
        </div>
    )
}