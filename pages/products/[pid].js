import { Fragment } from 'react'

import fs from 'fs/promises'
import path from 'path'

export default function ProductDetailPage(props) {
    const { loadedProduct } = props

    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)

    return data
}

export async function getStaticProps(context) {

    const data = await getData()

    const { params } = context
    const productId = params.pid

    const product = data.products.find(product => product.id === productId)

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {

    const data = await getData()
    const pidsArr = data.products.map(product => ({params: {pid: product.id}}))

    return {
        paths: pidsArr,
        fallback: true
    }
}