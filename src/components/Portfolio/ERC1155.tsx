import { ERC1155, isERC1155, Token } from "../../types";
import css from "../../styles/components/portfolio/token.module.css";
import { useEffect, useState } from "react";
import { URL } from "url";

type Props = {
    token: ERC1155;
}

export default function TokenERC1155({ token }: Props) {

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
        <div className={css.erc1155}>
            <p className={css.tokenId}># {token.tokenId.toString()}</p>
            <p className={css.balance}>Owned: {token.tokenBalance.toString()}</p>
            {image ? <img src={token.tokenURL} alt={token.address} /> : (
                <>
                    <p>No Image Available</p>
                </>
            )}
        </div>
    )
}