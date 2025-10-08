import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WorkflowCanvas from './screens/WorkflowCanvas';

const WorkflowRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<WorkflowCanvas />} />
    <Route path="/canvas" element={<WorkflowCanvas />} />
  </Routes>
);

export default WorkflowRoutes;
