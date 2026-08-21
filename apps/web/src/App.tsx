import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './app/providers/ThemeProvider';
import { LocaleProvider } from './app/providers/LocaleProvider';
import { AppShell } from './components/layout/AppShell';
import { HomePage } from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const JourneyPage = lazy(() =>
  import('./pages/JourneyPage').then((m) => ({ default: m.JourneyPage })),
);
const WorkPage = lazy(() => import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })));
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })),
);
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage })),
);
const PostsPage = lazy(() => import('./pages/PostsPage').then((m) => ({ default: m.PostsPage })));
const PostDetailPage = lazy(() =>
  import('./pages/PostDetailPage').then((m) => ({ default: m.PostDetailPage })),
);
const LabPage = lazy(() => import('./pages/LabPage').then((m) => ({ default: m.LabPage })));
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);
const DesignSystemPage = lazy(() =>
  import('./pages/DesignSystemPage').then((m) => ({ default: m.DesignSystemPage })),
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <BrowserRouter>
            <Suspense fallback={null}>
              <Routes>
                <Route path="design-system" element={<DesignSystemPage />} />
                <Route element={<AppShell />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="journey" element={<JourneyPage />} />
                  <Route path="work" element={<WorkPage />} />
                  <Route path="projects" element={<ProjectsPage />} />
                  <Route path="projects/:slug" element={<ProjectDetailPage />} />
                  <Route path="posts" element={<PostsPage />} />
                  <Route path="posts/:slug" element={<PostDetailPage />} />
                  <Route path="lab" element={<LabPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
