import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FaNpm } from "react-icons/fa";
import { FaCircleUser } from 'react-icons/fa6';
import { useFetchPackages } from '@/hooks/useFetchPackages';
import { useNavigate } from 'react-router-dom';


const SearchBar = () => {
    const { data, input, setInput, loadings } = useFetchPackages();
    const navigate = useNavigate()
    return (
        <div className='border-b'>
            <div className="max-w-full px-4 md:px-8 mx-auto py-2 shadow-lg">
                <div className='flex gap-6 items-center'>
                    <FaNpm size={60} onClick={()=>navigate('/')} className='cursor-pointer'/>
                    <div className="relative w-[100%]">
                        <div>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input onChange={(e) => setInput(e.target.value)} value={input} className="pl-10 rounded-none w-full py-6 bg-muted text-lg" placeholder="Search packages" />
                        </div>
                        <Button className="absolute rounded-none right-0 top-0 bottom-0 h-full transform  bg-foreground hover:bg-foreground/85 text-background hover:text-background transition-all duration-200" variant="ghost">
                            Search
                        </Button>
                        <div className='absolute border bg-white top-12 right-0 left-0'>
                            {loadings && <div className='px-3 py-2'>...Loading</div>}
                            {data.length > 0 && data.map((pack, index) => (
                                <div key={index} onClick={() => {
                                    navigate(`/package/${pack.package.name}`)
                                    setInput('')
                                }} className='border-b px-3 py-2 cursor-pointer flex justify-between items-center'>
                                    <div>
                                        <h4>{pack.package.name}</h4>
                                        <p className='line-clamp-1'>{pack.package.description}</p>
                                    </div>
                                    <h4>
                                        {pack.package.version}
                                    </h4>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <FaCircleUser size={60} className='text-green-500' />
                </div>

            </div>
        </div>
    )
}

export default SearchBar