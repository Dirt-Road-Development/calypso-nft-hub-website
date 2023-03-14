import css from "../../styles/components/connection_screen.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectionScreenProps } from "../../types";

export default function ConnectionScreen(props: ConnectionScreenProps) {

    const { tag, subtag } = props;

    return (
        <div className={css.container}>
            <h3>{tag ?? "Ready to explore Calypso?"}</h3>
            <p>Click <strong>Connect Wallet</strong> to {subtag ?? " unlock more functionality now"}</p>
            <ConnectButton />
        </div>
    );
}