import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AssessmentContext = createContext(null);

export const AssessmentProvider = ({ children }) => {
  const [assessments, setAssessments] = useState([]);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAssessments = async () => {
    setLoading(true);
    try {
      const data = await api.getAssessments();
      setAssessments(data);
      if (data.length > 0 && !currentAssessment) {
        setCurrentAssessment(data[0]);
      }
    } catch (err) {
      console.error("Failed to load assessments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssessments();
  }, []);

  const selectAssessment = (itemOrId) => {
    if (typeof itemOrId === 'string') {
      const found = assessments.find(a => a.id === itemOrId);
      if (found) setCurrentAssessment(found);
    } else {
      setCurrentAssessment(itemOrId);
    }
  };

  const submitAssessment = async (formData) => {
    setLoading(true);
    try {
      const res = await api.submitAssessment(formData);
      if (res.success) {
        setAssessments(prev => [res.assessment, ...prev]);
        setCurrentAssessment(res.assessment);
        return res;
      }
    } catch (err) {
      console.error("Error evaluating credit assessment", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Summary statistics for dashboard
  const stats = {
    total: assessments.length,
    lowRisk: assessments.filter(a => a.prediction === 'Low Risk').length,
    mediumRisk: assessments.filter(a => a.prediction === 'Medium Risk').length,
    highRisk: assessments.filter(a => a.prediction === 'High Risk').length,
  };

  return (
    <AssessmentContext.Provider value={{
      assessments,
      currentAssessment,
      loading,
      stats,
      selectAssessment,
      submitAssessment,
      reloadAssessments: loadAssessments
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export const useAssessment = () => useContext(AssessmentContext);
