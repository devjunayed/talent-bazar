import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useAxios from '../../hooks/useAxios';
import { Link } from 'react-router-dom';



const BrowseJobs = () => {
    const axios = useAxios();
    const [findCategoriesData, setFindCategoriesData] = useState([]);
    const [searchCategory, setSearchCategory] = useState();
    const [searchData, setSearchData] = useState([]);


    useEffect(() => {
        
            axios.get('/getCategories')
                .then(res => {
                    setFindCategoriesData(res.data);
                    setSearchCategory(res.data[0]);
                    console.log(res.data);
                })
       
    }, [axios]);

    useEffect(() => {
        axios.get(`/browseJob?category=${searchCategory}`)
            .then(res => {
                setSearchData(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err));

    }, [axios, searchCategory]);


    const handleSelect = (index) => {
        const selectedCategory = findCategoriesData.filter(
            (item, currentIndex) => index === currentIndex);
        setSearchCategory(selectedCategory.toString());
    }


    console.log(searchData);
    return (
        <div>
              <h2 className='text-xl md:text-3xl font-bold text-center relative my-2 md:my-10 after:h-1 after:w-1/12 after:bg-zinc-300 after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-2 mb-4'>Browse Job</h2>
            <div className='md:mx-16 mx-2  text-center'>
                <Tabs defaultIndex={1} onSelect={(index) => handleSelect(index)}>
                    <TabList>
                        {
                            findCategoriesData.map((category, index) =>
                                <Tab key={index}>{category}</Tab>
                            )
                        }

                    </TabList>

                    {
                        findCategoriesData.map((category, index) =>
                            <TabPanel key={index}>
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                    {
                                        searchData.map((data) =>
                                            <div key={data._id}>
                                                <div className="card my-4 card-side bg-base-100 shadow-xl">
                                                    <div className="card-body">
                                                        <h2 className="card-title">{data.title}</h2>
                                                        <p className='text-left'>{data.description.slice(0, 200)}...</p>
                                                        <div className="flex justify-between flex-col md:flex-row text-zinc-500 mt-4 -mb-4">
                                                            <p className='text-left'>Price range: ${data.minimumPrice} - ${data.maximumPrice}</p>
                                                            <p className='text-left md:text-right'>Deadline: {data.jobDeadline}</p>
                                                        </div>
                                                        <span className="divider"></span>
                                                        <div className="card-actions justify-center">
                                                            <Link to={`/jobs/${data._id}`}>
                                                                <button className="btn btn-primary bg-black border-none hover:bg-zinc-800">Bid Now</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </TabPanel>
                        )
                    }

                    {/* {
                        searchData.map((data, index) => 
                            <TabPanel key={index}>
                                <h2>Any content 1</h2>
                            </TabPanel>
                        )
                    } */}
                </Tabs>
            </div>
        </div>
    );
};

export default BrowseJobs;