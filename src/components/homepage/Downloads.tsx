import { Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const Downloads = () => {
    return (
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
    )
}

export default Downloads