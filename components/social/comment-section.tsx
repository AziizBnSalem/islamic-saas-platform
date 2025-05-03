"use client"

import { useState } from "react"
import { X, Send, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"

interface CommentSectionProps {
  onClose: () => void
}

type Comment = {
  id: number
  username: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
}

export default function CommentSection({ onClose }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: "ahmed_islam",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "MashaAllah, cette vidéo est très inspirante! Jazak'Allah khair pour le partage.",
      timestamp: "Il y a 2h",
      likes: 24,
      isLiked: false,
    },
    {
      id: 2,
      username: "fatima_nur",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Subhan'Allah, j'ai beaucoup appris de cette vidéo. Qu'Allah vous récompense.",
      timestamp: "Il y a 5h",
      likes: 18,
      isLiked: true,
      replies: [
        {
          id: 21,
          username: "islamicwisdom",
          avatar: "/placeholder.svg?height=40&width=40",
          content: "Wa iyyakum, qu'Allah vous bénisse également!",
          timestamp: "Il y a 4h",
          likes: 7,
          isLiked: false,
        },
      ],
    },
    {
      id: 3,
      username: "yusuf_deen",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Pouvez-vous faire une vidéo sur la patience en Islam? C'est un sujet qui m'intéresse beaucoup.",
      timestamp: "Il y a 1j",
      likes: 42,
      isLiked: false,
    },
  ])

  const [newComment, setNewComment] = useState("")

  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments(
        comments.map((comment) => {
          if (comment.id === parentId && comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map((reply) => {
                if (reply.id === commentId) {
                  return {
                    ...reply,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    isLiked: !reply.isLiked,
                  }
                }
                return reply
              }),
            }
          }
          return comment
        }),
      )
    } else {
      setComments(
        comments.map((comment) => {
          if (comment.id === commentId) {
            return {
              ...comment,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked,
            }
          }
          return comment
        }),
      )
    }
  }

  const addComment = () => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now(),
      username: "vous",
      avatar: "/placeholder.svg?height=40&width=40",
      content: newComment,
      timestamp: "À l'instant",
      likes: 0,
      isLiked: false,
    }

    setComments([newCommentObj, ...comments])
    setNewComment("")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-200 p-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Commentaires</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <img src="/placeholder.svg?height=40&width=40" alt="Your avatar" />
          </Avatar>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="w-full border border-gray-300 rounded-full px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <Button
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-emerald-600 hover:bg-emerald-700 rounded-full"
              onClick={addComment}
              disabled={!newComment.trim()}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border-b border-gray-100">
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <img src={comment.avatar || "/placeholder.svg"} alt={`${comment.username}'s avatar`} />
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">@{comment.username}</div>
                  <div className="text-xs text-gray-500">{comment.timestamp}</div>
                </div>
                <p className="mt-1 text-gray-800">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                    onClick={() => handleLike(comment.id)}
                  >
                    <Heart
                      size={16}
                      fill={comment.isLiked ? "currentColor" : "none"}
                      className={comment.isLiked ? "text-red-500" : ""}
                    />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-sm text-gray-500 hover:text-gray-700">Répondre</button>
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 pl-6 border-l-2 border-gray-100">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="mt-3">
                        <div className="flex gap-2">
                          <Avatar className="h-8 w-8">
                            <img src={reply.avatar || "/placeholder.svg"} alt={`${reply.username}'s avatar`} />
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-sm">@{reply.username}</div>
                              <div className="text-xs text-gray-500">{reply.timestamp}</div>
                            </div>
                            <p className="mt-1 text-sm text-gray-800">{reply.content}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <button
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                                onClick={() => handleLike(reply.id, true, comment.id)}
                              >
                                <Heart
                                  size={14}
                                  fill={reply.isLiked ? "currentColor" : "none"}
                                  className={reply.isLiked ? "text-red-500" : ""}
                                />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
