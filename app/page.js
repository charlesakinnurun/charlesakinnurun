import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import OpenSource from "@/components/OpenSource";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Research from "@/components/Research";
import Receipts from "@/components/Receipts";
import Programming from "@/components/Programming";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
   <div className = "bg-[#151312]">
   <Hero/>
   <Projects/>
   <Experience/>
   <OpenSource/>
   <Certifications/>
   <Receipts/>
   <Education/>
   <Research/>
   {/* <Programming/> */}
   <ContactForm/>
   
   </div>
  );
}
