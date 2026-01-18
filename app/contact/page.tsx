import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with QVIL Studios",
};

export default function ContactPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">Contact</h1>
      <p className="text-lg text-muted-foreground">
        Get in touch with QVIL Studios. Coming soon.
      </p>
    </section>
  );
}
