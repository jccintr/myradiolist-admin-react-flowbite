import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import Categories from './home/Categories';
import Cities from './home/Cities';
import Radios from './home/Radios';
import Lists from './home/Lists';
import Users from './home/Users';
import SideBar from '../components/Sidebar';



 const Home = () => {
  const location = useLocation();
  const [page, setPage] = useState('');


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get('page');
    if (pageFromUrl) {
      setPage(pageFromUrl);
    }
  }, [location.search]);


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className=''>
        <SideBar/>
      </div>
       
       {page === 'categories' && <Categories />}
       {page === 'cities' && <Cities />}
       {page === 'radios' && <Radios />}
       {page === 'lists' && <Lists />}
       {page === 'users' && <Users />}
    </div>
  )
}

export default Home;
