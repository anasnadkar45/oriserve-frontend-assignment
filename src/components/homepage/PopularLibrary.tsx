import { Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
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

const PopularLibrary = () => {
    return (
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
    )
}

export default PopularLibrary