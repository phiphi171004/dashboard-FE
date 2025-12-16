import React, { useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, XCircle, TrendingUp, Award } from 'lucide-react';

const AutoGradingDashboard = ({ assignment, submissions }) => {
  const autoGraded = submissions.filter(s => s.autoGraded);
  const pending = submissions.filter(s => !s.autoGraded && s.submittedAt);
  const needReview = submissions.filter(s => s.needsReview);
  const errors = submissions.filter(s => s.gradingError);

  const avgScore = autoGraded.length > 0 
    ? (autoGraded.reduce((sum, s) => sum + (s.score || 0), 0) / autoGraded.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">🤖 Tự Động Chấm Bài</h2>
        <p className="text-gray-600 mt-1">
          {assignment.title} - {submissions.length} bài nộp
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Đã chấm tự động</p>
              <p className="text-3xl font-bold text-green-700 mt-1">{autoGraded.length}</p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <p className="text-xs text-green-600 mt-2">
            {((autoGraded.length / submissions.length) * 100).toFixed(0)}% hoàn thành
          </p>
        </div>

        <div className="card p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Đang chấm</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">{pending.length}</p>
            </div>
            <Clock className="h-10 w-10 text-blue-500" />
          </div>
          <p className="text-xs text-blue-600 mt-2">Đang xử lý...</p>
        </div>

        <div className="card p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Cần review</p>
              <p className="text-3xl font-bold text-yellow-700 mt-1">{needReview.length}</p>
            </div>
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
          </div>
          <p className="text-xs text-yellow-600 mt-2">Cần xem xét</p>
        </div>

        <div className="card p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Lỗi</p>
              <p className="text-3xl font-bold text-red-700 mt-1">{errors.length}</p>
            </div>
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <p className="text-xs text-red-600 mt-2">Cần xử lý</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Tiến độ chấm bài</h3>
          <span className="text-sm text-gray-600">
            {autoGraded.length}/{submissions.length} bài
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(autoGraded.length / submissions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Score Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">Điểm trung bình</h3>
          </div>
          <p className="text-4xl font-bold text-blue-600">{avgScore}/10</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Award className="h-6 w-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">Điểm cao nhất</h3>
          </div>
          <p className="text-4xl font-bold text-green-600">
            {Math.max(...autoGraded.map(s => s.score || 0), 0)}/10
          </p>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Điểm thấp nhất</h3>
          </div>
          <p className="text-4xl font-bold text-orange-600">
            {autoGraded.length > 0 ? Math.min(...autoGraded.map(s => s.score || 0)) : 0}/10
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoGradingDashboard;
