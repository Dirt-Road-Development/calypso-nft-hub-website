import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import ConnectionScreen from "./ConnectionScreen";
import css from "../../styles/components/handle_connection.module.css";

type Props = {
    children: JSX.Element | JSX.Element[];
}

export default function HandleConnection(props: Props) {

    const { address, isConnected } = useAccount();
    
    const hasAddress: boolean = address !== undefined;

    return (
        <div className={css.container}>
            {hasAddress ? (
                <div className="connected">
                    <div className="activity">
                        {/* {isConnected && <ConnectButton />} */}
                        {props.children}
                    </div>
                </div>
            ) : <ConnectionScreen />}
        </div>
    )
}