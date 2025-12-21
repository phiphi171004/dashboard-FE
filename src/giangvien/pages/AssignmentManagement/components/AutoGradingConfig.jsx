import React, { useState } from 'react';
import { Plus, X, Play, Code, CheckCircle, AlertCircle, Trash2, Copy } from 'lucide-react';

const AutoGradingConfig = ({ config, onChange }) => {
  const [testCases, setTestCases] = useState(