import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archives",
  description: "Explore the QVIL Studios fashion collection and portfolio",
};

export default function ArchivesPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Archives</h1>
      <p className="text-lg text-muted-foreground">
        Browse the QVIL Studios collection. Coming soon.
      </p>
    </section>
  );
}
