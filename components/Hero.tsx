import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Share Your Screen, Connect in Real-Time
          </h1>
          <p className="text-xl text-white mb-8">
            Collaborate seamlessly with our powerful screen sharing and live
            chat platform.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            Start Sharing Now
          </Button>
        </div>
        <div className="lg:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Screen sharing illustration"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
}
