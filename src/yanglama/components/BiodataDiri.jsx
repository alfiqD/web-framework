import Header from "./Header.jsx";
import About from "./About.jsx";
import Skills from "./Skills.jsx";
import Projects from "./Projects.jsx";
import Education from "./Education.jsx";
import Contact from "./Contact.jsx";

import "../styles/custom.css";

function BiodataDiri() {
  return (
    <div className="container">
      <Header />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
    </div>
  );
}

export default BiodataDiri;