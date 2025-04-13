import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Cakes from '../pages/Cakes';
import Summary from '../pages/Summary';
import NotFound from '../pages/NotFound';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Cakes />} />
        <Route path="/summary" element={<Summary />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
