import { useState, useCallback } from 'react'

const STORAGE_KEY = 'sap_fiori_prep_progress'

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { tests: {}, roleplay: {}, exams: {}, totalPoints: 0, streak: 0, lastActivity: null }
  } catch { return { tests: {}, roleplay: {}, exams: {}, totalPoints: 0, streak: 0, lastActivity: null } }
}

function saveProgress(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const recordTestResult = useCallback((testId, score, total, correct) => {
    setProgress(prev => {
      const pct = Math.round((correct / total) * 100)
      const pts = correct * 10
      const updated = {
        ...prev,
        tests: {
          ...prev.tests,
          [testId]: {
            attempts: (prev.tests[testId]?.attempts || 0) + 1,
            bestScore: Math.max(prev.tests[testId]?.bestScore || 0, pct),
            lastScore: pct,
            lastDate: new Date().toISOString(),
          }
        },
        totalPoints: (prev.totalPoints || 0) + pts,
        lastActivity: new Date().toISOString(),
      }
      saveProgress(updated)
      return updated
    })
  }, [])

  const recordRoleplayResult = useCallback((scenarioId, totalScore, maxScore) => {
    setProgress(prev => {
      const pct = Math.round((totalScore / maxScore) * 100)
      const updated = {
        ...prev,
        roleplay: {
          ...prev.roleplay,
          [scenarioId]: {
            attempts: (prev.roleplay[scenarioId]?.attempts || 0) + 1,
            bestScore: Math.max(prev.roleplay[scenarioId]?.bestScore || 0, pct),
            lastScore: pct,
            lastDate: new Date().toISOString(),
          }
        },
        totalPoints: (prev.totalPoints || 0) + totalScore * 5,
        lastActivity: new Date().toISOString(),
      }
      saveProgress(updated)
      return updated
    })
  }, [])

  const recordExamResult = useCallback((examId, score, total, correct) => {
    setProgress(prev => {
      const pct = Math.round((correct / total) * 100)
      const updated = {
        ...prev,
        exams: {
          ...prev.exams,
          [examId]: {
            attempts: (prev.exams[examId]?.attempts || 0) + 1,
            bestScore: Math.max(prev.exams[examId]?.bestScore || 0, pct),
            lastScore: pct,
            passed: pct >= 70,
            lastDate: new Date().toISOString(),
          }
        },
        totalPoints: (prev.totalPoints || 0) + correct * 15,
        lastActivity: new Date().toISOString(),
      }
      saveProgress(updated)
      return updated
    })
  }, [])

  const resetProgress = useCallback(() => {
    const fresh = { tests: {}, roleplay: {}, exams: {}, totalPoints: 0, streak: 0, lastActivity: null }
    saveProgress(fresh)
    setProgress(fresh)
  }, [])

  return { progress, recordTestResult, recordRoleplayResult, recordExamResult, resetProgress }
}
