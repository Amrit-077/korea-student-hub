import { useState } from 'react'
import PageHeader from '../components/shared/PageHeader'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

const initialPosts = [
  {
    id: '1',
    author: 'Priya S.',
    content: 'Does anyone know if UOU dormitory has WiFi included in the monthly fee? Moving in next month.',
    likes: 5,
    comments: [],
    createdAt: '2025-06-10',
  },
  {
    id: '2',
    author: 'Ahmed K.',
    content: 'Work permit approved after 10 days! Applied online via HiKorea. Very smooth process. Good luck to everyone waiting.',
    likes: 12,
    comments: [],
    createdAt: '2025-06-08',
  },
]

export default function Community() {
  const { user } = useAuth()
  const [posts, setPosts] = useState(initialPosts)
  const [newPost, setNewPost] = useState('')
  const [expandedPost, setExpandedPost] = useState(null)
  const [commentText, setCommentText] = useState('')

  const handleAddPost = () => {
    if (!newPost.trim()) return
    const post = {
      id: Date.now().toString(),
      author: user?.user_metadata?.full_name || 'Anonymous',
      content: newPost.trim(),
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString().split('T')[0],
    }
    setPosts([post, ...posts])
    setNewPost('')
  }

  const handleLike = (postId) => {
    setPosts(posts.map((p) =>
      p.id === postId ? { ...p, likes: p.likes + 1 } : p
    ))
  }

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return
    setPosts(posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            comments: [
              ...p.comments,
              {
                id: Date.now().toString(),
                author: user?.user_metadata?.full_name || 'Anonymous',
                text: commentText.trim(),
              },
            ],
          }
        : p
    ))
    setCommentText('')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Student Community"
        subtitle="Ask questions, share tips, and help each other out."
      />

      {user && (
        <Card>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share something with the community..."
            rows={3}
            className="w-full text-sm border border-neutral-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button
              variant="primary"
              onClick={handleAddPost}
              disabled={!newPost.trim()}
            >
              Post
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center text-secondary-700 text-sm font-semibold">
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{post.author}</p>
                  <p className="text-xs text-neutral-700/50">{post.createdAt}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-neutral-700 leading-relaxed mb-3">{post.content}</p>

            <div className="flex items-center gap-4 text-sm">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 text-neutral-700 hover:text-primary-600 transition-colors"
              >
                <span>👍</span>
                <span>{post.likes}</span>
              </button>
              <button
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                className="flex items-center gap-1.5 text-neutral-700 hover:text-secondary-600 transition-colors"
              >
                <span>💬</span>
                <span>{post.comments.length} comments</span>
              </button>
            </div>

            {expandedPost === post.id && (
              <div className="mt-4 space-y-3 border-t border-neutral-100 pt-3">
                {post.comments.map((c) => (
                  <div key={c.id} className="flex gap-2 text-sm">
                    <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-semibold text-neutral-700 shrink-0">
                      {c.author[0]}
                    </div>
                    <div className="bg-neutral-50 rounded-lg px-3 py-2 flex-1">
                      <span className="font-medium text-neutral-900">{c.author}: </span>
                      <span className="text-neutral-700">{c.text}</span>
                    </div>
                  </div>
                ))}
                {user && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="flex-1 text-sm border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id)
                      }}
                    />
                    <Button
                      variant="secondary"
                      onClick={() => handleAddComment(post.id)}
                    >
                      Send
                    </Button>
                  </div>
                )}
                {!user && (
                  <p className="text-xs text-neutral-700/60">
                    Log in to comment.
                  </p>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}