import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2, MessageCircle, Users, Lock } from "lucide-react";

const features = [
  {
    title: "Instant Screen Sharing",
    description:
      "Share your screen with a single click, no downloads required.",
    icon: Share2,
  },
  {
    title: "Live Chat",
    description: "Communicate in real-time with integrated chat functionality.",
    icon: MessageCircle,
  },
  {
    title: "Multi-User Collaboration",
    description: "Invite multiple participants to your sharing session.",
    icon: Users,
  },
  {
    title: "Secure and Private",
    description: "End-to-end encryption ensures your data stays safe.",
    icon: Lock,
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
