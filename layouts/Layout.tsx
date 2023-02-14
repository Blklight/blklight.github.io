interface LayoutProps {
  children: React.ReactNode;
}

import Footer from "@/components/Footer";
import ColorFilters from "@/components/ColorFilters";
import NavigationBar from "@/components/NavigationBar";

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className={`font-sans`}>
      <div className="block m-auto max-w-full">
        <div className="block">
          <NavigationBar />
          <div className="flex flex-1 flex-col max-w-full min-h-screen">
            {children}
            <Footer />
          </div>
        </div>
      </div>
      <ColorFilters />
    </main>
  );
};
export default Layout;
