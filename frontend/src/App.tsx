import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setUserFromToken } from "./store/authSlice";
import { jwtDecode } from "jwt-decode";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import FlightDetailsPage from "./pages/FlightDetailsPage";
import BookingSuccessPage from "./pages/BookingSuccessPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";

// Navbar
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [authLoaded, setAuthLoaded] = useState(false);

  // 🔁 Restore auth ONLY from sessionStorage
  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        dispatch(
          setUserFromToken({
            id: decoded.id,
            email: decoded.email,
            name: decoded.name || "User",
          })
        );
      } catch {
        sessionStorage.removeItem("token");
      }
    }

    setAuthLoaded(true);
  }, [dispatch]);

  // 🔒 Protected route
  const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  // Common layout
  const Layout = ({ children }: { children: JSX.Element }) => (
    <>
      <Navbar />
      <div className="pt-16 px-4">{children}</div>
    </>
  );

  if (!authLoaded) return null;

  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Private */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Layout>
              <HomePage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/search"
        element={
          <PrivateRoute>
            <Layout>
              <SearchPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/results"
        element={
          <PrivateRoute>
            <Layout>
              <ResultsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/flight/:id"
        element={
          <PrivateRoute>
            <Layout>
              <FlightDetailsPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/booking-success/:id"
        element={
          <PrivateRoute>
            <Layout>
              <BookingSuccessPage />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <PrivateRoute>
            <Layout>
              <BookingHistoryPage />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
