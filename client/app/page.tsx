import Login from "@/app/pages/login/Login";
import AuthContextProvider from "@/modules/auth_provider";

export default function Home() {
    return (
        <AuthContextProvider>
            <div className="flex flex-col md:flex-row h-full min-h-screen font-sans">
                <Login />
            </div>
        </AuthContextProvider>
    );
}
