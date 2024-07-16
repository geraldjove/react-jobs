import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import AddJobPage from "./pages/AddJobPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import EditJobPage from "./pages/EditJobPage";

// Add New Job
const addJob = async (newJob) => {
  const res = await fetch("/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });
  return;
};

// Delete Job
const deleteJob = async (id) => {
  const res = await fetch(`/api/jobs/${id}`, {
    method: "DELETE",
  });
  return;
};

// Update Job
const updateJobSubmit = async (job) => {
  const res = await fetch(`/api/jobs/${job.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(job),
  });
  return;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} end />
      <Route
        path="/jobs/add"
        element={<AddJobPage addJobSubmit={addJob} />}
        end
      />
      <Route
        path="/jobs/:id"
        element={<JobPage deleteJob={deleteJob} />}
        loader={jobLoader}
        end
      />
      <Route
        path="/jobs/edit/:id"
        element={<EditJobPage updateJobSubmit={updateJobSubmit} />}
        loader={jobLoader}
        end
      />
      <Route path="*" element={<NotFoundPage />} end />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
