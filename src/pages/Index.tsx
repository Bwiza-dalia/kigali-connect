// This file is kept for backwards compatibility
// The actual landing page is in Landing.tsx
import { Navigate } from 'react-router-dom';

const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
