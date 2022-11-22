import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function lastSalesPage(props) {

    const [sales, setSales] = useState(props.sales)

    const { data, error } = useSWR(
        'https://next-course-data-fetchin-aa929-default-rtdb.firebaseio.com/sales.json',
        (url) => fetch(url).then(res => res.json())
    )

    useEffect( () => {
        if (data) {
            const transformedSales = []

            for (let key in data) {
                transformedSales.push({
                    id: key,
                    ...data[key]
                })
            }

            setSales(transformedSales)
        }
    }, [data])


    if (error) {
        return <p>Failed to load!</p>
    }

    if (!data && !sales) {
        return <p>Loading...</p>
    }


    return (
        <ul>
            {sales.map(sale => (
                <li key={sale.id}>
                    {sale.username} - ${sale.volume}
                </li>
            ))}
        </ul>
    )
}

export async function getStaticProps() {
    const response = await fetch('https://next-course-data-fetchin-aa929-default-rtdb.firebaseio.com/sales.json')
    const data = await response.json()
    
    const transformedSales = []

    for (let key in data) {
        transformedSales.push({
            id: key,
            ...data[key]
        })
    }

    return {
        props: {
            sales: transformedSales,
        },
        revalidate: 10
    }

}