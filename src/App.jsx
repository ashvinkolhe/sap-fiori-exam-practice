import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import RoleplayPage from './pages/RoleplayPage'
import RoleplaySessionPage from './pages/RoleplaySessionPage'
import PracticeTestsPage from './pages/PracticeTestsPage'
import TestSessionPage from './pages/TestSessionPage'
import MockExamPage from './pages/MockExamPage'
import MockExamSessionPage from './pages/MockExamSessionPage'
import StudyGuidesPage from './pages/StudyGuidesPage'
import DashboardPage from './pages/DashboardPage'
import SampleAnswersPage from './pages/SampleAnswersPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="roleplay" element={<RoleplayPage />} />
          <Route path="roleplay/:scenarioId" element={<RoleplaySessionPage />} />
          <Route path="samples" element={<SampleAnswersPage />} />
          <Route path="practice" element={<PracticeTestsPage />} />
          <Route path="practice/:testId" element={<TestSessionPage />} />
          <Route path="mock-exam" element={<MockExamPage />} />
          <Route path="mock-exam/:examId" element={<MockExamSessionPage />} />
          <Route path="guides" element={<StudyGuidesPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  )
}