import TopBanner from "@/components/layout/Banner/TopBanner";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";
import HolyLoader from "holy-loader";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HolyLoader color="#868686" />
            <TopBanner />
            <Providers>
                <TopNavbar />
                <main className="min-h-screen">
                    {children}
                </main>
            </Providers>
            <Footer />
        </>
    );
} 