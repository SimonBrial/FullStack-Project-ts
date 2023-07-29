import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    RegisterPage,
    TaskFormPage,
    ProfilePage,
    LoginPage,
    TasksPage,
    HomePage,
} from "./pages";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";

function App() {
    return (
        <AuthProvider>
            <TaskProvider>
                <BrowserRouter>
                    <main className="container mx-auto">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/register"
                                element={<RegisterPage />}
                            />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/tasks" element={<TasksPage />} />
                                <Route
                                    path="/add-task"
                                    element={<TaskFormPage />}
                                />
                                <Route
                                    path="/tasks/:id"
                                    element={<TaskFormPage />}
                                />
                                <Route
                                    path="/profile"
                                    element={<ProfilePage />}
                                />
                            </Route>
                        </Routes>
                    </main>
                </BrowserRouter>
            </TaskProvider>
        </AuthProvider>
    );
}

export default App;
