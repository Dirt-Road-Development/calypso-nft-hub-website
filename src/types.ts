import { BigNumber } from "ethers";

export type HeroProps = {
    slogan: string;
    secondary?: string;
    secondaryLink?: string;
    highlightedWords?: string[];
}

export type ImageSectionProps = {
    images: {
        url: string;
        alt: string;
        src: string;
    }[];
    direction: "row" | "column";
    radius?: string;
}

export type NavigationProps = {
    path: string;
    arr: {
        path: string;
        label: string;
    }[];
}

export type ConnectionScreenProps = {
    tag?: string;
    subtag?: string;
}

export type PolicyInformation = {
    sections: string[];
    title: string;
}

/** Portfolio Types */
export type TokenTypes = "erc-20" | "erc-721" | "erc-1155";

export type ERC = {
    type: TokenTypes;
    decimals: number;
    address: string;
}

export type ERC20 = {       
    name: string;
    symbol: string;
    balance: BigNumber;
} & ERC;

export type NFTData = {
    tokenId: BigNumber;
    tokenBalance: BigNumber;
    tokenURL: string;
}

export type ERC1155 = ERC & NFTData;

export type ERC721 = {
    name: string;
    symbol: string;
} & ERC & NFTData;

export type Token = ERC20 | ERC721 | ERC1155;

export function isERC20(toBeDetermined: Token): toBeDetermined is ERC20 {
    if ((toBeDetermined as ERC20).type === "erc-20") {
      return true;
    }
    return false;
}

export function isERC721(toBeDetermined: Token): toBeDetermined is ERC721 {
    if ((toBeDetermined as ERC721).type === "erc-721") {
      return true;
    }
    return false;
}

export function isERC1155(toBeDetermined: Token): toBeDetermined is ERC1155 {
    if ((toBeDetermined as ERC1155).type === "erc-1155") {
      return true;
    }
    return false;
}