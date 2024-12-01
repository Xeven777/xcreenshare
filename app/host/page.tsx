"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QRCode from "react-qr-code";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Copy,
  Monitor,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Peer from "peerjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function HostPage() {
  const [roomId, setRoomId] = useState<string>("");
  const [peer, setPeer] = useState<Peer | null>(null);
  const [viewers, setViewers] = useState<number>(0);
  const [hideQR, setHideQR] = useState(false);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);
  const router = useRouter();
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.NEXT_PUBLIC_URL}`
      : "http://localhost:3000";

  useEffect(() => {
    try {
      const newPeer = new Peer();

      setPeer(newPeer);

      newPeer.on("open", (id) => {
        setRoomId(id);
      });

      newPeer.on("connection", (conn) => {
        setViewers((prev) => prev + 1);

        conn.on("close", () => {
          setViewers((prev) => prev - 1);
        });

        toast.info("New viewer connected", {
          description: "Click to start sharing your screen",
          duration: Infinity,
          action: {
            label: "Start Sharing",
            onClick: async () => {
              try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                  video: true,
                });
                setActiveStream(stream);
                const call = newPeer.call(conn.peer, stream);

                stream.getVideoTracks()[0].onended = () => {
                  call.close();
                  stream.getTracks().forEach((track) => track.stop());
                };
              } catch (err) {
                console.error("Screen sharing error:", err);
                toast.error("Screen sharing error", {
                  description:
                    "Failed to start screen sharing. Please try again.",
                });
              }
            },
          },
        });
      });

      return () => {
        newPeer.destroy();
      };
    } catch (error) {
      console.error("Error initializing peer:", error);
    }
  }, []);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast.success("Room code copied!", {
      description: "Share this code with others to let them join your room.",
    });
  };

  const endSession = () => {
    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
      setActiveStream(null);
    }

    if (peer) {
      peer.destroy();
      setPeer(null);
    }

    setViewers(0);
    setRoomId("");

    toast.warning("Session ended", {
      description: "Your screen sharing session has been terminated.",
    });

    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Button asChild variant="outline">
        <Link href={"/"}>
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-6 w-6" />
            Your Screen Sharing Room
          </CardTitle>
          <CardDescription>
            Share this room code with others to let them view your screen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <code className="flex-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-lg font-mono">
              {roomId || "Generating room code..."}
            </code>
            <Button
              variant="outline"
              size="icon"
              onClick={copyRoomId}
              disabled={!roomId}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">Current Viewers</span>
            </div>
            <span className="text-lg font-semibold">{viewers}</span>
          </div>

          {activeStream && (
            <div className="flex justify-end pt-4">
              <Button
                variant="destructive"
                onClick={endSession}
                className="flex items-center gap-2"
              >
                Stop sharing
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      <Button
        className="absolute -top-4 right-1 z-30 group"
        onClick={() => setHideQR(!hideQR)}
      >
        <span className="group-hover:block hidden">
          {hideQR ? "Show" : "Hide"} QR
        </span>
        {hideQR ? <ChevronLeft /> : <ChevronRight />}
      </Button>
      <div
        className={cn(
          "fixed top-2 right-4 bg-muted shadow p-2 rounded-lg",
          hideQR && "hidden"
        )}
      >
        <h2 className="text-center font-semibold mb-2">Scan to Join</h2>

        <QRCode value={`${baseUrl}/join?id=${roomId}`} size={256} />
      </div>
    </div>
  );
}