import { Button } from "@/components/ui/button";
import Image from "next/image";
import desktop from "@/app/assets/desktops.jpg";
import Link from "next/link";

const steps = [
  {
    title: "Create a Room",
    description: "A random room code will be generated for you.",
  },
  {
    title: "Start the code",
    description:
      "Click the 'Share Screen' button and allow access to your screen.",
  },
  {
    title: "Collaborate in Real-Time",
    description:
      "Share your screen with others in real-time, without any limitations!",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 max-w-7xl w-full mx-auto px-4">
      <div className="w-full mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <Image
              src={desktop}
              fetchPriority="low"
              alt="How it works illustration"
              placeholder="blur"
              width={600}
              height={400}
              className="rounded-lg shadow-xl aspect-video object-cover object-center hover:object-bottom transition-all duration-1000 ease-in-out"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            {steps.map((step, index) => (
              <div key={index} className="mb-8 flex items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
            <Button size="lg" className="mt-6" asChild>
              <Link href={"/host"}>Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
