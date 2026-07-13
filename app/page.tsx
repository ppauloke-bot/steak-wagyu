import Header from "./components/Header";
import ScrollVideoSection from "./components/ScrollVideoSection";
import ClosingFooter from "./components/ClosingFooter";

export default function Home() {
  return (
    <main id="top" className="bg-char">
      <Header />

      <ScrollVideoSection
        videoSrc="/steak.mp4"
        videoWebm="/steak.webm"
        containerHeightVh={400}
        chapters={[
          {
            startProgress: 0.0,
            endProgress: 0.25,
            number: "01",
            label: "THE CUT",
            word: "Marbled.",
            caption: "A5 Wagyu striploin. The rarest grade a cut can earn.",
            anchor: "cut",
          },
          {
            startProgress: 0.25,
            endProgress: 0.5,
            number: "02",
            label: "THE AGE",
            word: "Aged.",
            caption:
              "Steakhouses age beef 28 to 45 days — long enough to deepen flavor, not so long it turns funky.",
            stats: [
              { value: "28–45", unit: "d", label: "Dry age" },
              { value: "A5", label: "Wagyu grade" },
              { value: "1.1", unit: "kg", label: "Bone-in cut" },
            ],
            anchor: "age",
          },
          {
            startProgress: 0.5,
            endProgress: 0.75,
            number: "03",
            label: "THE SEAR",
            word: "Seared.",
            caption:
              "Marbling this fine only comes from A5 — the highest grade a wagyu can earn.",
            stats: [
              { value: "300", unit: "°C", label: "Cast iron" },
              { value: "90", unit: "s", label: "Per side" },
              { value: "52", unit: "°C", label: "Center · rest" },
            ],
            anchor: "sear",
          },
          {
            startProgress: 0.75,
            endProgress: 1.0,
            number: "04",
            label: "THE TABLE",
            word: "The Table.",
            caption: "Twelve seats. One seating nightly.",
            cta: "Reserve a seat",
            anchor: "table",
          },
        ]}
      />

      <ClosingFooter />
    </main>
  );
}
