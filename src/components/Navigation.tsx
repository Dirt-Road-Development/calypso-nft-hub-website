import Link from "next/link";
import { useRouter } from "next/router";
import { NavigationProps } from "../types";
import NavigationJson from "../constants/navigation.json";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navigation() {

    const { isConnected } = useAccount();
    const { pathname } = useRouter();

    const navJson = {
        arr: NavigationJson.links,
        path: pathname,
    } satisfies NavigationProps;

    const isWeb3Route = () => {
        return  pathname.includes("portfolio")  ||
                pathname.includes("web3")       ||
                pathname.includes("mint")       ;
    }

    return (
        <nav>
            <Link style={{ textDecoration: "none"}} href="/">
                <img src="/calypso_nft_hub.svg" />
                <h1>Calypso NFT Hub</h1>
            </Link>
            <div className="links">
                {navJson.arr.map((opt, index: number) => {
                    const { path, label } = opt;
                    let classes = "link";
                    if (navJson.path === path) classes += " selected";                   
                    return <Link key={index} href={path} className={classes}>{label}</Link>;
                })}
            </div>
            {isConnected && isWeb3Route() && <div className="wallet-connection">
                <ConnectButton showBalance={false} chainStatus={"icon"} accountStatus={"avatar"} />
            </div>}
        </nav>
    );
}