import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import OpenSource from "@/components/OpenSource";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Receipts from "@/components/Receipts";
import Programming from "@/components/Programming";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
   <div className = "bg-[#151312]">
   <Hero/>
   <Education/>
   <Receipts/>
   <Projects/>
   <OpenSource/>
   <Certifications/>
   {/* <Programming/> */}
   <ContactForm/>
   
   </div>
  );
}
