import { useEffect, useState } from "react"

export default function lastSalesPage() {

    const [sales, setSales] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect( () => {
        setIsLoading(true)
        fetch('https://next-course-data-fetchin-aa929-default-rtdb.firebaseio.com/sales.json')
            .then(res => res.json())
            .then(data => {
                const transformedSales = []

                for (let key in data) {
                    transformedSales.push({
                        id: key,
                        ...data[key]
                    })
                }

                setSales(transformedSales)
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (sales.length === 0) {
        return <p>No data yet...</p>
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