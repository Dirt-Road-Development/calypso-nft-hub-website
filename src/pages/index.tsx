import Hero from "../components/Hero";
import PageWrapper from "../components/PageWrapper/Wrapper";
import css from "../styles/pages/home.module.css";
import Config from "../constants/home.json";
import ImageSection from "../components/ImageSection";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

export default function Index() {
  return (
    <PageWrapper useWeb3={false}>
      <div className={css.container}>
        <Hero {...{...Config.hero}} />
        <h3 className="section-title">Building on Calypso</h3>
        <ImageSection images={Config.images} direction="row" />
      </div>
    </PageWrapper>
  );
}