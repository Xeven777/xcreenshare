"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Users } from "lucide-react";
import Link from "next/link";
import Peer from "peerjs";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("id")) {
      setRoomId(searchParams.get("id") || "");
    }
  }, [searchParams.get("id")]);

  const joinRoom = () => {
    if (!roomId.trim()) {
      toast({
        title: "Room code required",
        description: "Please enter a valid room code",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    const peer = new Peer();

    peer.on("open", () => {
      const conn = peer.connect(roomId);

      conn.on("open", () => {
        setIsConnected(true);
        toast({
          title: "Connected!",
          description: "Waiting for host to share their screen...",
        });
      });

      peer.on("call", (call) => {
        call.answer();
        call.on("stream", (remoteStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
            videoRef.current.play().catch(console.error);
          }
        });
      });

      conn.on("close", () => {
        setIsConnecting(false);
        setIsConnected(false);
        toast({
          title: "Disconnected",
          description: "The host has ended the session",
          variant: "destructive",
        });
      });
    });

    peer.on("error", (err) => {
      setIsConnecting(false);
      toast({
        title: "Connection failed",
        description:
          "Could not connect to the room. Please check the room code and try again.",
        variant: "destructive",
      });
    });
  };

  return (
    <div
      className={cn(
        "mx-auto space-y-8",
        isConnected ? "max-w-6xl" : "max-w-2xl"
      )}
    >
      <Button variant="outline" asChild>
        <Link href={"/"}>
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6" />
            Join a Room
          </CardTitle>
          <CardDescription>
            Enter the room code to join and view the shared screen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isConnected ? (
            <div className="space-y-4">
              <Input
                placeholder="Enter room code"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                disabled={isConnecting}
              />
              <Button
                className="w-full"
                onClick={joinRoom}
                disabled={isConnecting || !roomId.trim()}
              >
                {isConnecting ? "Connecting..." : "Join Room"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                ref={videoContainerRef}
                className="relative aspect-video bg-muted-foreground rounded-lg overflow-hidden group "
              >
                <video
                  ref={videoRef}
                  className="size-full object-contain bg-gradient-to-br from-background to-muted"
                  autoPlay
                  playsInline
                  controls
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
