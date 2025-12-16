import React, { useState } from 'react';
import { CheckCircle, XCircle, Clock, Code, Zap, FileText, MessageSquare } from 'lucide-react';

const AutoGradingResult = ({ submission, onApprove, onReject }) => {
  const [teacherScore, setTeacherScore] = useState(submission.score);
  const [comment, setComment] = useState('');

  const result = submission.autoGradingResult || {};
  const testCases = result.testCases || [];
  const codeQuality = result.codeQuality || {};
  const performance = result.performance || {};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {submission.studentName}
            </h2>
            <p className="text-gray-600">{submission.studentId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Điểm tự động</p>
            <p className="text-5xl font-bold text-blue-600">{submission.score}/10</p>
          </div>
        </div>
      </div>

      {/* Test Cases */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Test Cases ({testCases.filter(t => t.passed).length}/{testCases.length} passed)
          </h3>
        </div>

        <div className="space-y-3">
          {testCases.map((test, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-lg border-2 ${
                test.passed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {test.passed ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span className="font-semibold">Test {idx + 1}</span>
                </div>
                <span className={`text-sm font-medium ${
                  test.passed ? 'text-green-600' : 'text-red-600'
                }`}>
                  {test.score}/{test.maxScore} điểm
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm mt-3">
                <div>
                  <p className="text-gray-600">Input:</p>
                  <code className="text-gray-900">{test.input}</code>
                </div>
                <div>
                  <p className="text-gray-600">Expected:</p>
                  <code className="text-gray-900">{test.expected}</code>
                </div>
                <div>
                  <p className="text-gray-600">Got:</p>
                  <code className={test.passed ? 'text-green-600' : 'text-red-600'}>
                    {test.actual}
                  </code>
                </div>
              </div>

              {test.executionTime && (
                <p className="text-xs text-gray-500 mt-2">
                  <Clock className="h-3 w-3 inline mr-1" />
                  Thời gian: {test.executionTime}ms
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Code Quality */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Code className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Code Quality ({codeQuality.score || 0}/10 điểm)
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Coding Style</span>
            <span className="font-semibold text-green-600">
              {codeQuality.style || 'Good'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Naming</span>
            <span className="font-semibold text-green-600">
              {codeQuality.naming || 'Good'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Complexity</span>
            <span className="font-semibold text-blue-600">
              {codeQuality.complexity || 'Low'}
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Comments</span>
            <span className="font-semibold text-yellow-600">
              {codeQuality.comments || 'Fair'}
            </span>
          </div>
        </div>

        {codeQuality.issues && codeQuality.issues.length > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm font-medium text-yellow-800 mb-2">Gợi ý cải thiện:</p>
            <ul className="text-sm text-yellow-700 space-y-1">
              {codeQuality.issues.map((issue, idx) => (
                <li key={idx}>• {issue}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Performance */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Zap className="h-6 w-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Performance ({performance.score || 0}/10 điểm)
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Time Complexity</p>
            <p className="text-xl font-bold text-green-600">
              {performance.timeComplexity || 'O(n)'}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Space Complexity</p>
            <p className="text-xl font-bold text-blue-600">
              {performance.spaceComplexity || 'O(1)'}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Execution Time</p>
            <p className="text-xl font-bold text-purple-600">
              {performance.executionTime || '0.001'}s
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Memory Usage</p>
            <p className="text-xl font-bold text-orange-600">
              {performance.memoryUsage || '12'} MB
            </p>
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="card p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-6 w-6 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Code Submitted</h3>
        </div>
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{submission.code || '// Code here...'}</code>
        </pre>
      </div>

      {/* Auto Feedback */}
      <div className="card p-6 bg-blue-50">
        <div className="flex items-center space-x-3 mb-4">
          <MessageSquare className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Feedback Tự Động</h3>
        </div>
        <p className="text-gray-700">{result.feedback || 'Tốt lắm! Code của bạn hoạt động đúng.'}</p>
      </div>

      {/* Teacher Review */}
      <div className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">👨‍🏫 Giảng Viên Review</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Điều chỉnh điểm
            </label>
            <input
              type="number"
              min="0"
              max="10"
              step="0.5"
              value={teacherScore}
              onChange={(e) => setTeacherScore(e.target.value)}
              className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <span className="ml-2 text-gray-600">/10</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment thêm
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Nhận xét của giảng viên..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => onApprove(teacherScore, comment)}
              className="flex-1 btn-primary flex items-center justify-center space-x-2"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Approve & Publish</span>
            </button>
            <button
              onClick={onReject}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yêu cầu nộp lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoGradingResult;
