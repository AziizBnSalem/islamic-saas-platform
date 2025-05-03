"use client"

import { useState, useRef, useEffect } from "react"
import { Heart, MessageCircle, Share2, BookmarkPlus, MoreVertical, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SocialSidebar from "@/components/social/social-sidebar"
import CommentSection from "@/components/social/comment-section"

// Mock data for videos
const videos = [
  {
    id: 1,
    username: "islamicwisdom",
    userAvatar: "/placeholder.svg?height=50&width=50",
    description:
      "La patience est une vertu en Islam. Le Prophète Muhammad (paix et bénédiction sur lui) a dit: 'La patience est la lumière.' #islam #sagesse",
    videoUrl: "/placeholder.svg?height=800&width=450",
    likes: 1245,
    comments: 89,
    shares: 56,
    tags: ["islam", "sagesse", "patience"],
    isVerified: true,
  },
  {
    id: 2,
    username: "quran_daily",
    userAvatar: "/placeholder.svg?height=50&width=50",
    description:
      "Récitation émouvante de la sourate Al-Fatiha. 'Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux.' #coran #récitation",
    videoUrl: "/placeholder.svg?height=800&width=450",
    likes: 2567,
    comments: 134,
    shares: 321,
    tags: ["coran", "récitation", "islam"],
    isVerified: true,
  },
  {
    id: 3,
    username: "islamic_art",
    userAvatar: "/placeholder.svg?height=50&width=50",
    description:
      "L'art de la calligraphie islamique - une tradition séculaire qui continue d'inspirer. #art #calligraphie #islam",
    videoUrl: "/placeholder.svg?height=800&width=450",
    likes: 876,
    comments: 45,
    shares: 67,
    tags: ["art", "calligraphie", "islam"],
    isVerified: false,
  },
]

export default function SocialPage() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isLiked, setIsLiked] = useState<Record<number, boolean>>({})
  const [showComments, setShowComments] = useState(false)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const toggleLike = (videoId: number) => {
    setIsLiked((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (videoRefs.current[activeVideoIndex]) {
      videoRefs.current[activeVideoIndex]!.muted = !isMuted
    }
  }

  const handleScroll = (index: number) => {
    setActiveVideoIndex(index)

    // Pause all videos
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause()
      }
    })

    // Play the active video
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.play().catch((e) => console.log("Auto-play prevented:", e))
    }
  }

  useEffect(() => {
    // Initialize video refs array
    videoRefs.current = videoRefs.current.slice(0, videos.length)

    // Set up Intersection Observer to detect which video is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            handleScroll(index)
          }
        })
      },
      { threshold: 0.7 },
    )

    // Observe all video containers
    document.querySelectorAll(".video-container").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SocialSidebar />

      <div className="flex-1 max-w-3xl mx-auto">
        <Tabs defaultValue="for-you" className="w-full">
          <div className="sticky top-16 z-30 bg-white border-b border-gray-200">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="for-you">Pour Vous</TabsTrigger>
              <TabsTrigger value="following">Abonnements</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="for-you" className="mt-0">
            <div className="flex flex-col">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="video-container relative snap-start w-full"
                  data-index={index}
                  style={{ height: "calc(100vh - 8rem)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black">
                    {/* This would be a video in a real implementation */}
                    <img
                      src={video.videoUrl || "/placeholder.svg"}
                      alt={`Vidéo de ${video.username}`}
                      className="h-full w-full object-cover"
                    />

                    {/* Video controls */}
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-20 right-4 bg-black/50 p-2 rounded-full text-white"
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                  </div>

                  {/* Video info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
                    <div className="flex items-start mb-4">
                      <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                        <img src={video.userAvatar || "/placeholder.svg"} alt={video.username} />
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-semibold">@{video.username}</span>
                          {video.isVerified && (
                            <span className="ml-1 bg-emerald-500 text-white rounded-full p-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3 w-3"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-200 mt-1">{video.description}</p>
                        <div className="flex flex-wrap mt-2">
                          {video.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-white/20 px-2 py-0.5 rounded-full mr-2 mb-1">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-white">
                        <MoreVertical size={20} />
                      </Button>
                    </div>
                  </div>

                  {/* Interaction buttons */}
                  <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6">
                    <button className="flex flex-col items-center" onClick={() => toggleLike(video.id)}>
                      <div
                        className={`bg-black/50 p-3 rounded-full ${isLiked[video.id] ? "text-red-500" : "text-white"}`}
                      >
                        <Heart size={24} fill={isLiked[video.id] ? "currentColor" : "none"} />
                      </div>
                      <span className="text-white text-xs mt-1">{video.likes + (isLiked[video.id] ? 1 : 0)}</span>
                    </button>

                    <button className="flex flex-col items-center" onClick={() => setShowComments(!showComments)}>
                      <div className="bg-black/50 p-3 rounded-full text-white">
                        <MessageCircle size={24} />
                      </div>
                      <span className="text-white text-xs mt-1">{video.comments}</span>
                    </button>

                    <button className="flex flex-col items-center">
                      <div className="bg-black/50 p-3 rounded-full text-white">
                        <Share2 size={24} />
                      </div>
                      <span className="text-white text-xs mt-1">{video.shares}</span>
                    </button>

                    <button className="flex flex-col items-center">
                      <div className="bg-black/50 p-3 rounded-full text-white">
                        <BookmarkPlus size={24} />
                      </div>
                      <span className="text-white text-xs mt-1">Sauver</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="following">
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <div className="text-center max-w-md p-6">
                <h3 className="text-xl font-semibold mb-2">Suivez des créateurs islamiques</h3>
                <p className="text-gray-600 mb-6">
                  Abonnez-vous à des créateurs de contenu islamique pour voir leurs publications ici.
                </p>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Découvrir des créateurs</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Comments section - slide in from the right */}
      {showComments && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg z-50 overflow-y-auto">
          <CommentSection onClose={() => setShowComments(false)} />
        </div>
      )}
    </div>
  )
}
