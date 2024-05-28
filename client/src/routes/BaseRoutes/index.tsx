import { LoginPage } from "@/pages/LoginPage";
import { UserSignupPage } from "@/pages/UserSignupPage";
import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { HomePage } from "@/pages/HomePage";
import { CategoryListPage } from "@/pages/CategoryListPage";
import { CategoryFormPage } from "@/pages/CategoryFormPage";
import { ProductFormPage } from "@/pages/ProductFormPage";
import { ProductListPage } from "@/pages/ProductListPage";
import { ProductListPageV2 } from "@/pages/ProductListPageV2";
import { ProductFormPageV2 } from "@/pages/ProductFormPageV2";

export function BaseRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />

        {/* Private Routes */}
        <Route element={<AuthenticatedRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />

          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/:id" element={<CategoryFormPage />} />

          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id" element={<ProductFormPage />} />

          <Route path="/products-v2" element={<ProductListPageV2 />} />
          <Route path="/products-v2/new" element={<ProductFormPageV2 />} />
          <Route path="/products-v2/:id" element={<ProductFormPageV2 />} />
        </Route>
      </Routes>
    </>
  );
}
