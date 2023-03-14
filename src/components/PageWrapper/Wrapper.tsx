import Web3Wrapper from "../Web3/Web3Wrapper";
import css from "../../styles/components/page_wrapper.module.css";

type Props = {
    useWeb3: boolean;
    children: JSX.Element | JSX.Element[];
}

export default function PageWrapper(props: Props) {
    return (
        <div className={css.container}>
            {props.useWeb3 ? <Web3Wrapper>{props.children}</Web3Wrapper> : props.children}
        </div>
    )
}