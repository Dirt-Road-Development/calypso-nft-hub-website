import HandleConnection from "./HandleConnection";

type Props = {
    children: JSX.Element | JSX.Element[];
}

export default function Web3Wrapper(props: Props) {
    return (
        <div id="web3-page-wrapper">
            <HandleConnection>
                {props.children}
            </HandleConnection>
        </div>
    )
}