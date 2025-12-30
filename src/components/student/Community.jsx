import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useT } from '../../context/LanguageContext';
import { mockPosts } from '../../data/mockPosts';
import { getFromStorage, saveToStorage } from '../../utils/storage';
import { Heart, MessageCircle, Plus, ChevronDown, ChevronUp, Send, Mail } from 'lucide-react';
import Button from '../shared/Button';
import { useNavigate } from 'react-router-dom';
import Toast from '../shared/Toast';

const Community = () => {
  const { user, isAuthenticated } = useUser();
  const { t } = useT();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/?login=true');
      return;
    }

    const stored = getFromStorage('communityPosts', mockPosts);
    setPosts(stored);
    
    // Load comments for all posts
    const storedComments = getFromStorage('postComments', {});
    setComments(storedComments);
  }, [isAuthenticated, navigate]);

  const handleLike = (postId) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const wasLiked = post.liked;
        return {
          ...post,
          liked: !wasLiked,
          likes: wasLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    });
    setPosts(updated);
    saveToStorage('communityPosts', updated);
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: `post_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      avatar: user.name?.charAt(0) || '👤',
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
    };

    const updated = [post, ...posts];
    setPosts(updated);
    saveToStorage('communityPosts', updated);
    setNewPost('');
    setShowCreateModal(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getPostComments = (postId) => {
    return comments[postId] || [];
  };

  const getCommentCount = (postId) => {
    return getPostComments(postId).length;
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment = {
      id: `comment_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      avatar: user.profilePicture || user.name?.charAt(0) || '👤',
      text: commentText,
      timestamp: new Date().toISOString(),
    };

    const postComments = getPostComments(postId);
    const updatedComments = {
      ...comments,
      [postId]: [...postComments, newComment]
    };

    setComments(updatedComments);
    saveToStorage('postComments', updatedComments);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setToastMessage(t('commentAdded'));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [postId]: value
    }));
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('community')}
          </h1>
          <Button
            onClick={() => setShowCreateModal(true)}
            variant="primary"
            className="flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{t('shareAchievement')}</span>
          </Button>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold overflow-hidden">
                  {post.avatar && post.avatar.startsWith('data:image') ? (
                    <img src={post.avatar} alt={post.userName} className="w-full h-full object-cover" />
                  ) : (
                    post.avatar || post.userName?.charAt(0) || '👤'
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-800">{post.userName}</h3>
                    <span className="text-sm text-gray-500">·</span>
                    <span className="text-sm text-gray-500">{formatTime(post.timestamp)}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{post.content}</p>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 transition ${
                        post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    {user?.type === 'student' && (
                      <>
                        <button
                          onClick={() => toggleComments(post.id)}
                          className="flex items-center space-x-2 text-gray-500 hover:text-primary transition"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>{getCommentCount(post.id)} {t('comments')}</span>
                          {expandedComments[post.id] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => navigate('/messages', { state: { userId: post.userId, userName: post.userName } })}
                          className="flex items-center space-x-2 text-gray-500 hover:text-primary transition"
                        >
                          <Mail className="w-5 h-5" />
                          <span>{t('message')}</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Comments Section */}
                  {expandedComments[post.id] && user?.type === 'student' && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-semibold text-gray-800 mb-4">
                        {getCommentCount(post.id)} {t('comments')}
                      </h4>
                      
                      {/* Existing Comments */}
                      <div className="space-y-4 mb-4">
                        {getPostComments(post.id).map((comment) => (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden">
                              {comment.avatar && comment.avatar.startsWith('data:image') ? (
                                <img src={comment.avatar} alt={comment.userName} className="w-full h-full object-cover" />
                              ) : (
                                comment.avatar
                              )}
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold text-gray-800 text-sm">{comment.userName}</span>
                                <span className="text-xs text-gray-500">·</span>
                                <span className="text-xs text-gray-500">{formatTime(comment.timestamp)}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{comment.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Add Comment Input */}
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0 overflow-hidden">
                          {user.profilePicture && user.profilePicture.startsWith('data:image') ? (
                            <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name?.charAt(0) || '👤'
                          )}
                        </div>
                        <div className="flex-1 flex space-x-2">
                          <input
                            type="text"
                            value={commentInputs[post.id] || ''}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                            placeholder={t('writeComment')}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(post.id);
                              }
                            }}
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition flex items-center space-x-2"
                          >
                            <Send className="w-4 h-4" />
                            <span>{t('post')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">{t('shareAchievement')}</h2>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder={t('whatDidYouAccomplish')}
              className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
            />
            <div className="flex space-x-3">
              <Button
                onClick={handleCreatePost}
                variant="primary"
                className="flex-1"
              >
                {t('post')}
              </Button>
              <Button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewPost('');
                }}
                variant="outline"
                className="flex-1"
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default Community;


