import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

const PackageCard = ({ pack, navigate }:any) => {
    return (
        <Card>
            <CardHeader>
                <h4
                    className="font-semibold cursor-pointer hover:underline hover:opacity-70"
                    onClick={() => navigate(`/package/${pack.package.name}`)}
                >
                    {pack.package.name}
                </h4>
            </CardHeader>
            <CardContent>
                <p>{pack.package.description}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                    {pack.package.keywords?.map((keyword:any) => (
                        <Badge key={keyword} variant={"secondary"}>
                            {keyword}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default PackageCard;
