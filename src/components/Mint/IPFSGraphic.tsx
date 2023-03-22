import { useEffect, useState } from "react";
import css from "./IPFSGraphic.module.css";

type Props = {
    tokenURL: string | null;
}

export default function IPFSGraphic(props: Props) {

    let [gatewayURL, setGatewayURL] = useState<string>();

    const cleanIPFSUrl = (url: string) => {
        if (url && url.includes("ipfs://")) {
            url = "https://cf-ipfs.com/ipfs/" + url.split("ipfs://")[1];
        }

        return url;
    }

    useEffect(() => {
        const loadGraphic = async(url: string) => {
            await fetch(cleanIPFSUrl(url))
                .then((res) => res.json())
                .then((res) => {
                    if (res["image"]) setGatewayURL(cleanIPFSUrl(res["image"]));
                })
        }

        if (props.tokenURL) loadGraphic(props.tokenURL);
    }, [props.tokenURL])

    return (
        <div className={css.container}>
            {gatewayURL 
            ? <img src={gatewayURL} alt="IPFS Graphic" />
            : <p>Loading Metadata...</p>
        }   
        </div>
    );
}