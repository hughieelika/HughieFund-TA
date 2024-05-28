import Layout from "../Components/Layout.jsx";
import { NavBar, Footer, Hero, CreateCampaignForm } from "@/Components";
import { CrowdFundingProvider } from "../Context/CrowdFunding";
import ProjectList from "@/Components/ProjectList";

const CreateCampaign = () => {
  return (
    <section className="">
      <CrowdFundingProvider className="bg-blue-600">
        <NavBar />
        <Hero />
        <CreateCampaignForm />
        <Footer />
      </CrowdFundingProvider>
    </section>
  );
};

export default CreateCampaign;

CreateCampaign.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
