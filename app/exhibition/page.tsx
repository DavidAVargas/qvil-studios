import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition",
  description: "Runway shows and fashion events by QVIL Studios",
};

export default function ExhibitionPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Exhibition</h1>
      <p className="text-lg text-muted-foreground">
        Runway shows and fashion presentations. Coming soon.
      </p>
    </section>
  );
}
