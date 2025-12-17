import { Navigation, Hero, About, Topics, Courses, Footer } from "@/components/landing";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="topics">
          <Topics />
        </section>
        <section id="courses">
          <Courses />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
