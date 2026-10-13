import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import InitialLoader from "@/components/InitialLoader";
import AnimatedBackground from "@/components/AnimatedBackground";
import ChatAssistant from "@/components/ChatAssistant";
import MobileAppChrome from "@/components/mobile/MobileAppChrome";
import JsonLd from "@/components/seo/JsonLd";
import SkipToContent from "@/components/seo/SkipToContent";
import { buildSiteGraph } from "@/lib/structured-data";

export default function WebsiteLayout({ children }) {
  return (
    <div className="mobile-app-root relative flex min-h-full flex-col bg-transparent font-sans text-foreground">
      <JsonLd data={buildSiteGraph()} />
      <SkipToContent />
      <AnimatedBackground />
      <InitialLoader />
      <Header />
      <main id="main-content" className="mobile-app-main flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <FloatingContact />
      <MobileAppChrome />
      <ChatAssistant />
    </div>
  );
}
