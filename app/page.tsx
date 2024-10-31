import AboutOurCompany from './components/home/AboutOurCompany';
import Banner from './components/home/Banner';
import CleaningIndustryNews from './components/home/CleaningIndustryNews';
import OurCleaningServices from './components/home/OurCleaningServices';
import ReasonsToChooseUs from './components/home/ReasonsToChooseUs';
import Testimonials from './components/home/Testimonials';

const Home = () => {
  return (
    <main>
      <Banner />
      <OurCleaningServices />
      <AboutOurCompany />
      <ReasonsToChooseUs />
      <Testimonials />
      <CleaningIndustryNews />
    </main>
  );
};

export default Home;
