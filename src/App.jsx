import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home                from "./pages/Home";
import CorporatePrinting   from "./pages/CorporatePrinting";
import BannerPrinting      from "./pages/BannerPrinting";
import ProductPage         from "./pages/ProductPage";
import CategoryLandingPage from "./pages/CategoryLandingPage";

import LoginPage           from "./pages/admin/login/LoginPage";
import AuthGuard           from "./components/AuthGuard";
import Dashboard           from "./pages/admin/Dashboard";
import AddProduct          from "./pages/admin/products/AddProduct";
import ManageProducts      from "./pages/admin/products/ManageProducts";
import ManageBanners       from "./pages/admin/banners/ManageBanners";
import ManageCategories    from "./pages/admin/categories/ManageCategories";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public ── */}
        <Route path="/"                   element={<Home />} />
        <Route path="/corporate-printing" element={<CorporatePrinting />} />
        <Route path="/banner-printing"    element={<BannerPrinting />} />
        <Route path="/product/:slug"      element={<ProductPage />} />

        {/* ── Category pages — all dynamic via CategoryLandingPage ── */}
        {/* Generic route: /category/:id — used by navbar links */}
        <Route path="/category/:id"       element={<CategoryLandingPage />} />

        {/* Named routes (legacy + convenience) — look up category by name */}
        <Route path="/apparels"           element={<CategoryLandingPage fixedName="Custom Apparel" />} />
        <Route path="/drinkware"          element={<CategoryLandingPage fixedName="Drinkware" />} />
        <Route path="/visiting-cards"     element={<CategoryLandingPage fixedName="Visiting Cards & ID Cards" />} />
        <Route path="/stationery"         element={<CategoryLandingPage fixedName="Stationery, Letterheads & Notebooks" />} />
        <Route path="/labels-stickers"    element={<CategoryLandingPage fixedName="Labels, Stickers & Carry Bags" />} />

        {/* ── Admin login (public) ── */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ── Admin (all protected) ── */}
        <Route path="/admin" element={
          <AuthGuard><Dashboard /></AuthGuard>
        } />
        <Route path="/admin/add-product" element={
          <AuthGuard><AddProduct /></AuthGuard>
        } />
        <Route path="/admin/products" element={
          <AuthGuard><ManageProducts /></AuthGuard>
        } />
        <Route path="/admin/categories" element={
          <AuthGuard><ManageCategories /></AuthGuard>
        } />
        <Route path="/admin/banners" element={
          <AuthGuard><ManageBanners /></AuthGuard>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;