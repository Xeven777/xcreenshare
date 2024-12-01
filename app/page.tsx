import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Monitor, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
          Share Your Screen Instantly
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Create a room, share the code, and start presenting to your audience
          in seconds.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-6 w-6" />
              Start Sharing
            </CardTitle>
            <CardDescription>
              Create a room and share your screen with others
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/host">
              <Button className="w-full">Create Room</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6" />
              Join a Room
            </CardTitle>
            <CardDescription>
              Enter a room code to view someone's screen
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/join">
              <Button variant="outline" className="w-full">
                Join Room
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
