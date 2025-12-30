import { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { Save, Upload, X, Camera } from 'lucide-react';
import Button from '../shared/Button';
import Toast from '../shared/Toast';

const Profile = () => {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (user) {
      if (user.type === 'company') {
        setFormData({
          name: user.name || '',
          companyName: user.name || '',
          industry: user.industry || '',
          email: user.email || '',
          phone: user.phone || '',
          location: user.location || '',
          website: user.website || '',
          about: user.about || '',
        });
      } else {
        setFormData({
          name: user.name || '',
          email: user.email || '',
          age: user.age || '',
          university: user.university || '',
          phone: user.phone || '',
          experience: user.experience || '',
          previousWork: user.previousWork || '',
        });
      }
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (user.type === 'company') {
      updateUser({
        name: formData.companyName,
        ...formData,
      });
    } else {
      updateUser({
        ...formData,
        age: parseInt(formData.age),
        experience: parseInt(formData.experience) || 0,
      });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleChangePicture = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/jpg,image/png,image/gif';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setToastMessage('Image size must be less than 2MB');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
        setShowPreview(true);
      };
      reader.onerror = () => {
        setToastMessage('Error reading image file');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleSaveProfilePicture = () => {
    if (previewImage) {
      updateUser({ profilePicture: previewImage });
      setShowPreview(false);
      setPreviewImage(null);
      setToastMessage('Profile picture updated successfully!');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleCancelPreview = () => {
    setShowPreview(false);
    setPreviewImage(null);
  };

  const getAvatarDisplay = (userData) => {
    if (userData?.profilePicture && userData.profilePicture.startsWith('data:image')) {
      return userData.profilePicture;
    }
    return null;
  };

  const getAvatarFallback = (userData) => {
    if (userData?.profilePicture && userData.profilePicture.startsWith('data:image')) {
      return null;
    }
    return userData?.name?.charAt(0) || (userData?.type === 'company' ? 'C' : 'U');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Company Profile
  if (user.type === 'company') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Company Profile
          </h1>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
                  {getAvatarDisplay(user) ? (
                    <img src={getAvatarDisplay(user)} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    getAvatarFallback(user)
                  )}
                </div>
                <button
                  onClick={handleChangePicture}
                  className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/90 transition"
                  title="Change Profile Picture"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Company (Optional)</label>
                <textarea
                  name="about"
                  value={formData.about || ''}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your company..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <Button
                onClick={handleSave}
                variant="primary"
                className="w-full flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{saved ? 'Saved!' : 'Save Changes'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student Profile

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Profile
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-5xl font-bold overflow-hidden">
                {getAvatarDisplay(user) ? (
                  <img src={getAvatarDisplay(user)} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  getAvatarFallback(user)
                )}
              </div>
              <button
                onClick={handleChangePicture}
                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow-lg hover:bg-primary/90 transition"
                title="Change Profile Picture"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={formData.experience || ''}
                onChange={handleChange}
                min="0"
                max="20"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Previous Work</label>
              <textarea
                name="previousWork"
                value={formData.previousWork || ''}
                onChange={handleChange}
                rows="3"
                placeholder="Briefly describe your previous work or projects"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="flex flex-wrap gap-2">
                {user.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {user.recommendedField && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recommended Field</label>
                <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium capitalize">
                  {user.recommendedField}
                </span>
              </div>
            )}

            <Button
              onClick={handleSave}
              variant="primary"
              className="w-full flex items-center justify-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{saved ? 'Saved!' : 'Save Changes'}</span>
            </Button>
          </div>
        </div>

        {/* Profile Picture Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Preview Profile Picture</h3>
              <div className="flex justify-center mb-6">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center overflow-hidden">
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={handleSaveProfilePicture}
                  variant="primary"
                  className="flex-1"
                >
                  Save Picture
                </Button>
                <Button
                  onClick={handleCancelPreview}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {showToast && (
          <Toast
            message={toastMessage}
            type={toastMessage.includes('Error') ? 'error' : 'success'}
            onClose={() => setShowToast(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;


