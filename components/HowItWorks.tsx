import { Button } from "@/components/ui/button";
import Image from "next/image";

const steps = [
  {
    title: "Create an Account",
    description: "Sign up for free and set up your profile in minutes.",
  },
  {
    title: "Start a Sharing Session",
    description: "Click the 'Share Screen' button and invite participants.",
  },
  {
    title: "Collaborate in Real-Time",
    description: "Share your screen, chat, and work together seamlessly.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="How it works illustration"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            {steps.map((step, index) => (
              <div key={index} className="mb-8 flex items-start">
                <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
            <Button size="lg" className="mt-6">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
