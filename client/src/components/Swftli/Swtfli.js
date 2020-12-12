import Cards from './Cards/Cards';
import Header from './Header/Header.js';
import Footer from './Footer.js';

import './userStyles.css';

function Swftli() {
  return (
    <div className='swftli'>
      <Header username='@digitalia' />
      <Cards />
      <Footer />
    </div>
  );
}

export default Swftli;
