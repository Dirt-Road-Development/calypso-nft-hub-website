import { useEffect, useState } from 'react';
import { useContractEvent } from 'wagmi'

type Props = {
    contractAddress: string;
    contractABI: any;
}

export default function SuccessfulMint(props: Props) {

    // const [ids, setIds] = useState<j

    useContractEvent({
        address: props.contractAddress as `0x${string}`,
        abi: props.contractABI,
        eventName: 'Transfer',
        listener(...args) {
            console.log("ARGS: ", args);
        },
      })

    return (
        <p>Successful Mint</p>
    );
}