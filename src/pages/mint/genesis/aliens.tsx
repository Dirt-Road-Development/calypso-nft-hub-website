import { useAccount, useSwitchNetwork, usePrepareContractWrite, useContractWrite, useWaitForTransaction, useNetwork, useContractReads } from "wagmi";
import { PageWrapper } from "../../../components/PageWrapper";
import css from "../../../styles/pages/mint.module.css";
import CalypsoAliensABI from "../../../constants/abis/CalypsoAliensERC721.json";
import { useEffect } from "react";
import IPFSGraphic from "../../../components/Mint/IPFSGraphic";
import SuccessfulMint from "../../../components/Mint/SuccessfulMint";

export default function MintPage() {

    const contractAddress: `0x${string}` = process.env.NODE_ENV === "production" ? "0x" : "0x0a9989af8aeD58796dADbCeea43BF77f810a2C1c";

    const { switchNetwork } = useSwitchNetwork();

    const { config } = usePrepareContractWrite({
        chainId: parseInt("0x1482a7b2"),
        address: contractAddress,
        abi: CalypsoAliensABI,
        functionName: 'publicMint',
    });
   
    const { data, error, isError, write } = useContractWrite(config);
 
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    });

    const { data: readData } = useContractReads({
        contracts: [
            {
                abi: CalypsoAliensABI,
                address: contractAddress,
                functionName: "MAX_SUPPLY"
            },
            {
                abi: CalypsoAliensABI,
                address: contractAddress,
                functionName: "tokenIdCounter"
            },
            {
                abi: CalypsoAliensABI,
                address: contractAddress,
                functionName: "nextTokenURI"
            }
        ]
    });

    useEffect(() => {
        if (switchNetwork) switchNetwork(parseInt("0x1482a7b2"));
    }, [])

    console.log("Success: ", isSuccess);

    return (
        <PageWrapper useWeb3={true}>
            <div className={css.container}>
                {isError && <p>Mint Unsuccessful</p>}
                {(isLoading || readData === undefined) && <p>Loading</p>}
                {isSuccess && (
                    <div className={css.canMint}>
                        {data && <SuccessfulMint {...{contractAddress, contractABI: CalypsoAliensABI}} />}
                    </div>
                )}
                {!isLoading && !isSuccess && !isError && (
                    <div className={css.canMint}>
                        <IPFSGraphic tokenURL={readData ? readData[2] as string: ""} />
                        <button className={css.mintButton} disabled={!write || isLoading} onClick={() => write && write()}>{readData && readData[1] ? "Mint #" + readData[1].toString() : "Loading"}</button>
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}
