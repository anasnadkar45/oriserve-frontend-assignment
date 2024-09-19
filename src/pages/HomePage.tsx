import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Laptop, Server, Terminal, FileText, Paintbrush, ShieldCheck, Smartphone, Cog, Square } from "lucide-react"
import { BsRobot } from "react-icons/bs"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"

const popularLibraries = [
    "react",
    "react-dom",
    "lodash",
    "axios",
    "tslib",
    "chalk",
    "next",
    "inquirer",
    "express",
    "commander",
]

const categories = [
    { name: "Front-end", icon: <Laptop className="h-6 w-6" /> },
    { name: "Back-end", icon: <Server className="h-6 w-6" /> },
    { name: "CLI", icon: <Terminal className="h-6 w-6" /> },
    { name: "Documentation", icon: <FileText className="h-6 w-6" /> },
    { name: "CSS", icon: <Paintbrush className="h-6 w-6" /> },
    { name: "Testing", icon: <ShieldCheck className="h-6 w-6" /> },
    { name: "IoT", icon: <Cog className="h-6 w-6" /> },
    { name: "Coverage", icon: <Square className="h-6 w-6" /> },
    { name: "Mobile", icon: <Smartphone className="h-6 w-6" /> },
    { name: "Frameworks", icon: <Cog className="h-6 w-6" /> },
    { name: "Robotics", icon: <BsRobot className="h-6 w-6" /> },
    { name: "Math", icon: <Square className="h-6 w-6" /> },
]

export default function HomePage() {
    const [category, setCategory] = useState<string>('');
    const [isCategory, SetIsCategory] = useState(false);
    const [packages, setPackages] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const categoryHandler = (name: string) => {
        setCategory(name);
    }

    const fetchPackageByCategory = async () => {
        try {
            const response = await fetch(`https://api.npms.io/v2/search?q=keywords:${category}`)
            const result = await response.json();
            setTotal(result.total)
            setPackages(result.results);
            if (category?.length > 0) {
                SetIsCategory(true);
            } else {
                SetIsCategory(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPackageByCategory();
    }, [category])

    console.log(isCategory)
    console.log(packages)

    return (
        <div>
            {isCategory ? (
                <div>
                    <div className="flex justify-between">
                        <h4 className="font-bold">{total} Packages Found</h4>
                        <Button onClick={() => setCategory('')}>Back</Button>
                    </div>
                    <div className="space-y-2 mt-6">
                        {packages.slice(0, 10).map((pack) => (
                            <Card>
                                <CardHeader>
                                    <h4 className="font-semibold cursor-pointer hover:underline hover:opacity-70" onClick={()=>navigate(`/package/${pack.package.name}`)}>{pack.package.name}</h4>
                                </CardHeader>
                                <CardContent>
                                    <p>{pack.package.description}</p>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {pack.package.keywords.map((keyword) =>(
                                            <Badge variant={"secondary"}>{keyword}</Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div >
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Cog className="h-5 w-5" />
                                Discover packages
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {categories.map((category) => (
                                    <Button onClick={() => categoryHandler(category.name)} key={category.name} variant="outline" className="h-auto flex-col py-4">
                                        {category.icon}
                                        <span className="mt-2">{category.name}</span>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="md:grid grid-cols-2 gap-6 mt-6 space-y-6 md:space-y-0">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cog className="h-5 w-5" />
                                    Popular libraries
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {popularLibraries.map((lib) => (
                                        <li key={lib} className="text-sm border-b py-2">
                                            <p>{lib}</p>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cog className="h-5 w-5" />
                                    By the numbers
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold">Packages</h3>
                                    <p className="text-3xl font-bold">3,317,162</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Downloads • Last Week</h3>
                                    <p className="text-3xl font-bold">62,238,214,699</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Downloads • Last Month</h3>
                                    <p className="text-3xl font-bold">266,922,368,284</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            )}
        </div>
    )
}