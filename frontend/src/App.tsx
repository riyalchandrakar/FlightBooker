import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

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

// Redux
import { type RootState } from "./store";

// 🔒 Private Route (NO localStorage)
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return user ? children : <Navigate to="/login" replace />;
};

// Common Layout
const Layout = ({ children }: { children: JSX.Element }) => (
  <>
    <Navbar />
    <div className="pt-16 px-4">{children}</div>
  </>
);

function App() {
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

      {/* Default */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
