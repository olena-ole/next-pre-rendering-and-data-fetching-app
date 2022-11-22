import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function lastSalesPage() {

    // const [sales, setSales] = useState()

    const fetcher = (url) => fetch(url)
        .then(res => res.json())
        .then(data => {
            const transformedSales = []

            for (let key in data) {
                transformedSales.push({
                    id: key,
                    ...data[key]
                })
            }

            return transformedSales
        })

    const { data, error } = useSWR(
        'https://next-course-data-fetchin-aa929-default-rtdb.firebaseio.com/sales.json', 
        fetcher 
    )

    // useEffect( () => {
    //     const transformedSales = []

    //     for (let key in data) {
    //         transformedSales.push({
    //             id: key,
    //             ...data[key]
    //         })
    //     }

    //     setSales(transformedSales)
    // }, [data])


    if (error) {
        return <p>Failed to load!</p>
    }

    if (!data) {
        return <p>Loading...</p>
    }


    return (
        <ul>
            {data.map(sale => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    )
}