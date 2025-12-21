import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import AutoGradingDashboard from './components/AutoGradingDashboard';
import AutoGradingResult from './components/AutoGradingResult';
import { mockAutoGradingData } from '../../data/autoGradingMockData';

const AutoGradingPage = () => {
  const { assignmentId } = useParams();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState(mockAutoGradingData.submissions);

  const assignment = {
    id: assignmentId,
    title: 'Bài tập 1: Tính tổng 2 số',
    course: 'Nhập môn lập trình'
  };

  const handleApprove = (submissionId, score, comment) => {
    setSubmissions(prev => prev.map(s => 
      s.id === submissionId 
        ? { ...s, approved: true, finalScore: score, teacherComment: comment }
        : s
    ));
    alert('Đã approve bài làm!');
    setSelectedSubmission(null);
  };

  const handleReject = (submissionId) => {
    alert('Đã yêu cầu sinh viên nộp lại!');
    setSelectedSubmission(null);
  };

  if (selectedSubmission) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedSubmission(null)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-700"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Quay lại danh sách</span>
        </button>

        <AutoGradingResult
          submission={selectedSubmission}
          onApprove={(score, comment) => handleApprove(selectedSubmission.id, score, comment)}
          onReject={() => handleReject(selectedSubmission.id)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/assignments"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-700"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Quay lại quản lý bài tập</span>
      </Link>

      <AutoGradingDashboard
        assignment={assignment}
        submissions={submissions}
      />

      {/* Submissions List */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Danh sách bài nộp</h3>
        
        <div className="space-y-3">
          {submissions.map(submission => (
            <div
              key={submission.id}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all cursor-pointer"
              onClick={() => setSelectedSubmission(submission)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-gray-700">
                      {submission.studentName}
                    </h4>
                    <span className="text-sm text-gray-600">
                      ({submission.studentId})
                    </span>
                    {submission.needsReview && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                        Cần review
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Nộp lúc: {new Date(submission.submittedAt).toLocaleString('vi-VN')}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">
                    {submission.score}/10
                  </p>
                  <p className="text-xs text-gray-600">
                    {submission.autoGradingResult.testCases.filter(t => t.passed).length}/
                    {submission.autoGradingResult.testCases.length} tests passed
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoGradingPage;
