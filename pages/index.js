import fs from 'fs/promises'
import path from 'path'

function HomePage(props) {

  const { products } = props

  return (
    <ul>
      {products.map(item => <li key={item.id}>{item.title}</li>)}
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

export default HomePage;
