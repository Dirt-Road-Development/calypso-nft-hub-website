import css from "../styles/components/hero.module.css";
import { HeroProps } from "../types";

export default function Hero(props: HeroProps) {
    return (
        <div className={css.hero}>
            <h2>
                {props.slogan.split(" ").map((word: string, index: number) => {
                    let classes: string[] = [];
                    if (props.highlightedWords?.includes(word)) classes.push("highlight");
                    return <span key={index} className={classes.join(" ")}>{word} </span>;
                })}
            </h2>
            {props.secondary && (
                <>
                    {props.secondaryLink
                        ? <a className="secondary" href={props.secondaryLink}>{props.secondary}</a>
                        : <p className="secondary">{props.secondary}</p>
                    }
                </>
            )}
        </div>
    );
}