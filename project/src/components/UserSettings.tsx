import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser, useClerk } from '@clerk/clerk-react';

interface UserSettingsProps {
  onClose: () => void;
}

export const UserSettings: React.FC<UserSettingsProps> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const { user } = useUser();
  const { client } = useClerk();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'preferences'>('general');
  const [isUpdating, setIsUpdating] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  
  // User Profile State
  const [profile, setProfile] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
    language: 'en',
    timezone: 'UTC',
    theme: 'light' as const,
    notifications: {
      email: true,
      orders: true,
      newsletter: false,
      offers: true,
    }
  });

  // Password Change State
  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Email Change State
  const [newEmail, setNewEmail] = useState('');
  const [showEmailChange, setShowEmailChange] = useState(false);

  // Update profile state when user data is available
  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.primaryEmailAddress?.emailAddress || ''
      }));
    }
  }, [user]);

  // Add username validation
  const validateUsername = (username: string) => {
    if (username.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (username.length > 20) {
      return 'Username must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    return '';
  };

  // New loading and error states
  const [updateStatus, setUpdateStatus] = useState({
    loading: false,
    error: '',
    success: false
  });

  // Handle profile image upload
  const handleImageUpload = async (file: File) => {
    try {
      setUpdateStatus({ loading: true, error: '', success: false });
      await user?.setProfileImage({ file });
      await user?.reload();
      setUpdateStatus({ loading: false, error: '', success: true });
      setTimeout(() => setUpdateStatus(prev => ({ ...prev, success: false })), 3000);
    } catch (error: any) {
      console.error('Error uploading image:', error);
      setUpdateStatus({
        loading: false,
        error: error.message || 'Failed to upload image',
        success: false
      });
    }
  };

  // Modified handleUpdateProfile function
  const handleUpdateProfile = async () => {
    if (!user) return;
    
    setUpdateStatus({ loading: true, error: '', success: false });

    try {
      const updates: any = {};
      
      if (profile.firstName !== user.firstName) {
        updates.firstName = profile.firstName;
      }
      
      if (profile.lastName !== user.lastName) {
        updates.lastName = profile.lastName;
      }
      
      if (profile.username !== user.username) {
        const usernameError = validateUsername(profile.username);
        if (usernameError) {
          throw new Error(usernameError);
        }
        updates.username = profile.username;
      }

      if (Object.keys(updates).length > 0) {
        await user.update(updates);
        await user.reload();
        setUpdateStatus({ loading: false, error: '', success: true });
        setTimeout(() => setUpdateStatus(prev => ({ ...prev, success: false })), 3000);
      } else {
        setUpdateStatus({ loading: false, error: '', success: true });
      }
    } catch (error: any) {
      console.error('Update error:', error);
      setUpdateStatus({
        loading: false,
        error: error.message || 'Failed to update profile',
        success: false
      });
    }
  };

  // Handle Password Change
  const handlePasswordChange = async () => {
    try {
      if (passwordState.newPassword !== passwordState.confirmPassword) {
        alert(t('New passwords do not match!'));
        return;
      }

      await user?.updatePassword({
        currentPassword: passwordState.currentPassword,
        newPassword: passwordState.newPassword,
      });

      setPasswordState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      alert(t('Password updated successfully!'));
    } catch (error) {
      console.error('Error updating password:', error);
      alert(t('Failed to update password'));
    }
  };

  // Handle Email Change
  const handleEmailChange = async () => {
    try {
      await user?.createEmailAddress({ email: newEmail });
      alert(t('Verification email sent to your new email address'));
      setShowEmailChange(false);
    } catch (error) {
      console.error('Error updating email:', error);
      alert(t('Failed to update email'));
    }
  };

  // Update the general tab render to include new error handling
  if (activeTab === 'general') {
    return (
      <div className="space-y-8">
        {/* Profile Picture Section */}
        <div className="flex items-center space-x-8">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-white/50 ring-4 ring-white/80">
              <img
                src={user?.imageUrl || 'https://via.placeholder.com/200'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg ring-2 ring-amber-200 text-amber-600 hover:text-orange-500 transition-colors duration-300 cursor-pointer transform hover:scale-110">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleImageUpload(file);
                  }
                }}
              />
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-amber-800 mb-1">
              {user?.firstName} {user?.lastName}
            </h4>
            <p className="text-sm text-amber-500">
              {user?.username ? `@${user.username}` : ''}
            </p>
          </div>
        </div>

        {/* Profile Information */}
        <div className="space-y-6">
          <div>
            <label className="block text-amber-700 mb-2 font-medium">{t('First Name')}</label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-2 bg-white/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-amber-900"
              placeholder={t('Your first name')}
            />
          </div>

          <div>
            <label className="block text-amber-700 mb-2 font-medium">{t('Last Name')}</label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-4 py-2 bg-white/50 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-amber-900"
              placeholder={t('Your last name')}
            />
          </div>

          <div>
            <label className="block text-amber-700 mb-2 font-medium">
              {t('Username')}
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
                if (value.length <= 20) {
                  setProfile(prev => ({ ...prev, username: value }));
                  setUpdateStatus(prev => ({ ...prev, error: '' }));
                }
              }}
              className={`w-full px-4 py-2 bg-white/50 border-2 ${
                updateStatus.error ? 'border-red-400' : 'border-amber-200'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-amber-900`}
              placeholder={t('Choose a unique username')}
              minLength={3}
              maxLength={20}
            />
            <p className="text-sm mt-1 text-amber-600">
              {t('3-20 characters, letters, numbers, and underscores only')}
            </p>
          </div>

          <div>
            <label className="block text-amber-700 mb-2 font-medium">{t('Email')}</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full px-4 py-2 bg-white/30 border-2 border-amber-100 rounded-xl backdrop-blur-sm transition-all duration-300 text-amber-900 cursor-not-allowed"
            />
            <p className="text-sm text-amber-600 mt-1">{t('Email cannot be changed')}</p>
          </div>

          {/* Status Messages */}
          {updateStatus.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {updateStatus.error}
            </div>
          )}
          
          {updateStatus.success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm">
              Profile updated successfully!
            </div>
          )}

          <button
            onClick={handleUpdateProfile}
            disabled={updateStatus.loading}
            className={`w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 relative ${
              updateStatus.loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {updateStatus.loading ? (
              <>
                <span className="opacity-0">{t('Update Profile')}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              </>
            ) : (
              t('Update Profile')
            )}
          </button>
        </div>
      </div>
    );
  }

  if (activeTab === 'security') {
    return (
      <div className="space-y-8">
        {/* Password Change Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">{t('Change Password')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-amber-700 mb-2">{t('Current Password')}</label>
              <input
                type="password"
                value={passwordState.currentPassword}
                onChange={(e) => setPasswordState(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-4 py-2 bg-white/50 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-amber-700 mb-2">{t('New Password')}</label>
              <input
                type="password"
                value={passwordState.newPassword}
                onChange={(e) => setPasswordState(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-4 py-2 bg-white/50 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-amber-700 mb-2">{t('Confirm New Password')}</label>
              <input
                type="password"
                value={passwordState.confirmPassword}
                onChange={(e) => setPasswordState(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-4 py-2 bg-white/50 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-xl hover:from-amber-600 hover:to-orange-600"
            >
              {t('Update Password')}
            </button>
          </div>
        </div>

        {/* Email Change Section */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold text-amber-800 mb-4">{t('Change Email')}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-amber-700 mb-2">{t('Current Email')}</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-2 bg-white/30 border-2 border-amber-100 rounded-xl text-amber-900/50"
              />
            </div>
            {showEmailChange ? (
              <>
                <div>
                  <label className="block text-amber-700 mb-2">{t('New Email')}</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-white/50 border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={handleEmailChange}
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-xl hover:from-amber-600 hover:to-orange-600"
                  >
                    {t('Send Verification Email')}
                  </button>
                  <button
                    onClick={() => setShowEmailChange(false)}
                    className="flex-1 border-2 border-amber-200 text-amber-700 py-2 rounded-xl hover:bg-amber-50"
                  >
                    {t('Cancel')}
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={() => setShowEmailChange(true)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2 rounded-xl hover:from-amber-600 hover:to-orange-600"
              >
                {t('Change Email')}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ...rest of the existing code for other tabs...
  return null;
};