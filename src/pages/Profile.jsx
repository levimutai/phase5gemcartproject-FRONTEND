import React from 'react';
import { useAuth } from '../context';

export default function Profile() {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-blue-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Profile</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900">{state.user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="text-gray-900">{state.user?.name || 'Not provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}