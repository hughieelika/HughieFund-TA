
import Layout from "../Components/Layout.jsx";
import { NavBar, Footer, Hero, DetailInvesKu } from "@/Components";
import { CrowdFundingProvider } from "../Context/CrowdFunding";
import ProjectList from "@/Components/ProjectList";

const DetailInves = () => {
  return (
    <section className="">
      <CrowdFundingProvider className="bg-blue-600">
        <NavBar />
        <DetailInvesKu />
        <Footer />
      </CrowdFundingProvider>
    </section>
  );
};

export default DetailInves;

DetailInves.getLayout = function getLayout(page) {
  return (
    <Layout>
      {/* <Sidebar /> */}
      {page}
    </Layout>
  );
};
