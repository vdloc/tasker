import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import AppCard from '../AppCard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
