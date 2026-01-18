import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind QVIL Studios and designer Justin J Vargas",
};

export default function AboutPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">About QVIL Studios</h1>
      <p className="text-lg text-muted-foreground">
        The story of QVIL Studios and the &quot;Fashion in Distortion&quot;
        philosophy. Coming soon.
      </p>
    </section>
  );
}
