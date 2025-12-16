export const mockAutoGradingData = {
  submissions: [
    {
      id: 1,
      studentId: '22CT001',
      studentName: 'Nguyễn Văn A',
      submittedAt: '2024-12-15T10:30:00',
      autoGraded: true,
      score: 9.5,
      needsReview: false,
      code: `def sum_two_numbers(a, b):
    """Tính tổng 2 số"""
    return a + b

# Test
print(sum_two_numbers(2, 3))`,
      autoGradingResult: {
        testCases: [
          { passed: true, input: '2, 3', expected: '5', actual: '5', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '-1, 5', expected: '4', actual: '4', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '0, 0', expected: '0', actual: '0', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '100, 200', expected: '300', actual: '300', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '-5, -3', expected: '-8', actual: '-8', score: 2, maxScore: 2, executionTime: 1 }
        ],
        codeQuality: {
          score: 9,
          style: 'Excellent',
          naming: 'Good',
          complexity: 'Low',
          comments: 'Good',
          issues: ['Có thể thêm type hints cho parameters']
        },
        performance: {
          score: 10,
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          executionTime: '0.001',
          memoryUsage: '12'
        },
        feedback: 'Xuất sắc! Code của bạn rất tốt. Tất cả test cases đều pass, code clean và performance tối ưu.'
      }
    },
    {
      id: 2,
      studentId: '22CT002',
      studentName: 'Trần Thị B',
      submittedAt: '2024-12-15T11:00:00',
      autoGraded: true,
      score: 7.5,
      needsReview: true,
      code: `def sum_two_numbers(a, b):
    result = a + b
    return result`,
      autoGradingResult: {
        testCases: [
          { passed: true, input: '2, 3', expected: '5', actual: '5', score: 2, maxScore: 2, executionTime: 2 },
          { passed: true, input: '-1, 5', expected: '4', actual: '4', score: 2, maxScore: 2, executionTime: 2 },
          { passed: false, input: '0, 0', expected: '0', actual: 'null', score: 0, maxScore: 2, executionTime: 2 },
          { passed: true, input: '100, 200', expected: '300', actual: '300', score: 2, maxScore: 2, executionTime: 2 },
          { passed: true, input: '-5, -3', expected: '-8', actual: '-8', score: 2, maxScore: 2, executionTime: 2 }
        ],
        codeQuality: {
          score: 6,
          style: 'Fair',
          naming: 'Good',
          complexity: 'Low',
          comments: 'Poor',
          issues: [
            'Thiếu docstring',
            'Thiếu comments giải thích',
            'Biến result không cần thiết'
          ]
        },
        performance: {
          score: 8,
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          executionTime: '0.002',
          memoryUsage: '14'
        },
        feedback: 'Code hoạt động tốt nhưng cần cải thiện về documentation và style. Một test case bị fail.'
      }
    },
    {
      id: 3,
      studentId: '22CT003',
      studentName: 'Lê Văn C',
      submittedAt: '2024-12-15T09:45:00',
      autoGraded: true,
      score: 10,
      needsReview: false,
      code: `def sum_two_numbers(a: int, b: int) -> int:
    """
    Tính tổng của hai số nguyên.
    
    Args:
        a: Số nguyên thứ nhất
        b: Số nguyên thứ hai
    
    Returns:
        Tổng của a và b
    """
    return a + b`,
      autoGradingResult: {
        testCases: [
          { passed: true, input: '2, 3', expected: '5', actual: '5', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '-1, 5', expected: '4', actual: '4', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '0, 0', expected: '0', actual: '0', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '100, 200', expected: '300', actual: '300', score: 2, maxScore: 2, executionTime: 1 },
          { passed: true, input: '-5, -3', expected: '-8', actual: '-8', score: 2, maxScore: 2, executionTime: 1 }
        ],
        codeQuality: {
          score: 10,
          style: 'Excellent',
          naming: 'Excellent',
          complexity: 'Low',
          comments: 'Excellent',
          issues: []
        },
        performance: {
          score: 10,
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          executionTime: '0.001',
          memoryUsage: '12'
        },
        feedback: 'Perfect! Code của bạn xuất sắc về mọi mặt. Có type hints, docstring đầy đủ, và tất cả test cases đều pass.'
      }
    }
  ]
};
