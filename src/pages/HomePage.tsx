import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DiscoverPackages from "@/components/homepage/DiscoverPackages";
import PopularLibrary from "@/components/homepage/PopularLibrary";
import Downloads from "@/components/homepage/Downloads";
import PackageCard from "@/components/homepage/PackageCard";

export default function HomePage() {
    const [category, setCategory] = useState<string>("");
    const [isCategory, setIsCategory] = useState(false);
    const [packages, setPackages] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    const categoryHandler = (name: string) => {
        setCategory(name);
    };

    const fetchPackageByCategory = async () => {
        try {
            const response = await fetch(
                `https://api.npms.io/v2/search?q=keywords:${category}`
            );
            const result = await response.json();
            setTotal(result.total);
            setPackages(result.results);
            if (category?.length > 0) {
                setIsCategory(true);
            } else {
                setIsCategory(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (category) {
            fetchPackageByCategory();
        }
    }, [category]);

    return (
        <div>
            {!isCategory ? (
                <div>
                    <DiscoverPackages setCategory={setCategory} />
                    <div className="md:grid grid-cols-2 gap-6 mt-6 space-y-6 md:space-y-0">
                        <PopularLibrary />
                        <Downloads />
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-between">
                        <h4 className="font-bold">{total} Packages Found</h4>
                        <Button onClick={() => setCategory("")}>Back</Button>
                    </div>
                    <div className="space-y-2 mt-6">
                        {packages.slice(0, 10).map((pack) => (
                            <PackageCard key={pack.package.name} pack={pack} navigate={navigate} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
