import About from './components/home/About'
import Banner from './components/home/Banner'
import CompletedProjects from './components/home/CompletedProjects'
import RequestEstimate from './components/home/RequestEstimate'
import Services from './components/home/Services'
import Stats from './components/home/Stats'
import Testimonials from './components/home/Testimonials'
import WhyChooseUs from './components/home/WhyChooseUs'
import WorkingProcess from './components/home/WorkingProcess'

const Home = () => {
  return (
    <>
      <Banner />
      <RequestEstimate />
      <About />
      <Services />
      <WhyChooseUs />
      <Stats />
      <WorkingProcess />
      <Testimonials />
      <CompletedProjects />
    </>
  )
}

export default Home
