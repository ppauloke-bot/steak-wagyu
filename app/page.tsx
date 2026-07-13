import Header from "./components/Header";
import ScrollVideoSection from "./components/ScrollVideoSection";
import ClosingFooter from "./components/ClosingFooter";

export default function Home() {
  return (
    <main id="top" className="bg-char">
      <Header />

      <ScrollVideoSection
        videoSrc="/steak.mp4"
        containerHeightVh={400}
        chapters={[
          {
            startProgress: 0.0,
            endProgress: 0.25,
            number: "01",
            label: "THE CUT",
            caption: "A5 Wagyu striploin. The rarest grade a cut can earn.",
          },
          {
            startProgress: 0.25,
            endProgress: 0.5,
            number: "02",
            label: "THE AGE",
            caption:
              "Steakhouses age beef 28 to 45 days — long enough to deepen flavor, not so long it turns funky.",
          },
          {
            startProgress: 0.5,
            endProgress: 0.75,
            number: "03",
            label: "THE SEAR",
            caption:
              "Marbling this fine only comes from A5 — the highest grade a wagyu can earn.",
          },
          {
            startProgress: 0.75,
            endProgress: 1.0,
            number: "04",
            label: "THE TABLE",
            caption: "Twelve seats. One seating nightly.",
          },
        ]}
      />

      <ClosingFooter />
    </main>
  );
}
