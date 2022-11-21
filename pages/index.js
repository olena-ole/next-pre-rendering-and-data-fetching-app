import fs from 'fs/promises'
import path from 'path'

import Link from 'next/link'

export default function HomePage(props) {

  const { products } = props

  return (
    <ul>
      {products.map(item => (
        <li key={item.id}>
          <Link href={`/products/${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  if (!data) {
    return {
      redirect: '/no-data'
    }
  }

  if (data.products.length === 0) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 10
  }
}

