import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CopyIcon, GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface PackageDetails {
    name: string;
    description: string;
    'dist-tags': {
        latest: string;
    };
    versions: {
        [key: string]: any;
    };
    time: {
        [key: string]: string;
    };
    repository: {
        url: string;
    };
    homepage: string;
    license: string;
    author: {
        name: string;
    };
}

const PackageDetail = () => {
    const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    console.log(packageDetails);


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const versionsPerPage = 10;

    const fetchPackageDetails = async () => {
        try {
            setLoading(true);
            setError(null); // Reset error state
            const response = await fetch(`https://registry.npmjs.org/${id}`);
            if (!response.ok) {
                throw new Error('Package not found');
            }
            const result = await response.json();
            setPackageDetails(result);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(err as string | null);
        }
    };

    useEffect(() => {
        fetchPackageDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!packageDetails) {
        return <div>No package details available.</div>;
    }

    const allVersions = Object.entries(packageDetails.versions).map(([version, data]) => ({
        version,
        date: packageDetails.time[version],
    })).reverse();

    // Calculate total pages
    const totalPages = Math.ceil(allVersions.length / versionsPerPage);

    // Get current versions for the page
    const indexOfLastVersion = currentPage * versionsPerPage;
    const indexOfFirstVersion = indexOfLastVersion - versionsPerPage;
    const currentVersions = allVersions.slice(indexOfFirstVersion, indexOfLastVersion);

    // Handle page changes
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };


    return (
        <div>
            <Card className='min-h-[70vh]'>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-3xl font-bold">{packageDetails.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{packageDetails['dist-tags'].latest} • Published a month ago</p>
                        </div>
                        <Badge variant="secondary">Public</Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="mb-4">{packageDetails.description}</p>
                    <Tabs defaultValue="install">
                        <TabsList>
                            <ScrollArea className="w-[240px] md:w-[340px] whitespace-nowrap rounded-md border">
                                <TabsTrigger value="install">Install</TabsTrigger>
                                <TabsTrigger value="repository">Repository</TabsTrigger>
                                <TabsTrigger value="homepage">Homepage</TabsTrigger>
                                <TabsTrigger value="versions">Versions</TabsTrigger>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </TabsList>
                        <TabsContent value="install" className="mt-4">
                            <div className="flex items-center space-x-2">
                                <code className="flex-1 bg-muted p-2 rounded-md">npm i {packageDetails.name}</code>
                                <Button size="icon" variant="outline" onClick={() => {
                                    navigator.clipboard.writeText(`npm i ${packageDetails.name}`)
                                        .then(() => {
                                            alert('Copied to clipboard!');
                                        })
                                        .catch((error) => {
                                            console.error('Failed to copy text: ', error);
                                        });
                                }}>
                                    <CopyIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="repository" className="mt-4">
                            <a href={packageDetails.repository.url.replace(/git\+ssh:\/\/git@|git\+https:\/\//, 'https://')} className="text-blue-500 hover:underline flex items-center">
                                <GitHubLogoIcon className="mr-2" />
                                {packageDetails.repository.url.replace(/git\+ssh:\/\/git@|git\+https:\/\//, '')}                            </a>
                        </TabsContent>
                        <TabsContent value="homepage" className="mt-4">
                            <a href={packageDetails.homepage} className="text-blue-500 hover:underline flex items-center">
                                <GlobeIcon className="mr-2" />
                                {packageDetails.homepage}
                            </a>
                        </TabsContent>
                        <TabsContent value="versions" className="mt-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Version</TableHead>
                                        <TableHead>Release Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {currentVersions.map((v, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{v.version}</TableCell>
                                            <TableCell>{new Date(v.date).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="flex justify-center mt-4 space-x-2">
                                <Button variant="outline" onClick={prevPage} disabled={currentPage === 1}>Previous</Button>
                                <Button variant="outline" onClick={nextPage} disabled={currentPage === totalPages}>Next</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div>
                            <h3 className="font-semibold">License</h3>
                            <p>{packageDetails.license}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Author</h3>
                            <p>{packageDetails.author.name}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PackageDetail;
