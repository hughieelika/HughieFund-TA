import Layout from "../Components/Layout.jsx";
import { NavBar, Footer, Hero } from "@/Components";
import { CrowdFundingProvider } from "../Context/CrowdFunding";
import ProjectList from "@/Components/ProjectList";

const Project = () => {
  return (
    <section className="">
      <CrowdFundingProvider className="bg-blue-600">
        <NavBar />
        <Hero />
        <ProjectList />
        <Footer />
      </CrowdFundingProvider>
    </section>
  );
};

export default Project;

Project.getLayout = function getLayout(page) {
  return (
    <Layout>
      {/* <Sidebar /> */}
      {page}
    </Layout>
  );
};
