import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkflowBuilder from "./components/WorkflowBuilder";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        <Hero />
        <WorkflowBuilder />
      </main>
      <Footer />
    </div>
  );
}

export default App;
