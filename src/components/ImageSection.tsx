import Image from "next/image";
import css from "../styles/components/image_section.module.css";
import { ImageSectionProps } from "../types"

export default function ImageSection(props: ImageSectionProps) {
    return (
        <div className={css["image-section"]}>
            {props.images.map((image, index: number) => <a key={index} href={image.url}><img style={{ borderRadius: props.radius ?? "0" }} src={image.src} alt={image.alt} /></a>)}
        </div>
    )
}
