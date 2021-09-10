import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { sanityClient, urlFor } from '../lib/sanity'

// const MyLink = forwardRef((props, ref) => <Link />)

const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`

export default function Home({ recipes }) {

  console.log('Recipes: ', recipes)

  return (
    <div className={styles.container}>
      <Head>
        <title>Bengas kitchen 🍝</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Bengas Kitchen</h1>

      <ul className="cards">
        {recipes?.length !== 0 &&
          recipes.map(recipe => (
            <li key={recipe._id}>
              <Link href="/">
                <a className="card">
                  <img src={urlFor(recipe.mainImage).url()} alt={recipe.name} style={{ width: '100%' }} />
                  <div className="container">
                    <h4><b>{recipe.name}</b></h4>
                  </div>
                </a>
              </Link>
            </li>
          ))
        }
      </ul>

    </div>
  )
}


export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery)

  return {
    props: { recipes }
  }
}