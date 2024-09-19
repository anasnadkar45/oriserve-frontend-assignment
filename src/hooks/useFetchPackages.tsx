import { useEffect, useState } from "react";

export function useFetchPackages() {
    const [data, setData] = useState([]);
    const [input, setInput] = useState('');
    const [debounceSearch, setDebounceSearch] = useState(input);
    const [loadings, setLoadings] = useState(false);
    const cache = {};

    const fetchData = async () => {
        try {
            setLoadings(true)
            const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${input}&size=10`);
            const result = await res.json();
            setData(result.objects);
            setLoadings(false);
        } catch (err) {
            console.log(err);
            setLoadings(false);
        }
    }

    // https://registry.npmjs.org/react
    // https://registry.npmjs.org/-/v1/search?text=react-icons&size=10
    useEffect(() => {
        fetchData();
    }, [debounceSearch])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceSearch(input);
        }, 600)

        return () => clearTimeout(timer)
    }, [input])
    console.log(data);
    return { data, input, setInput, loadings }
}