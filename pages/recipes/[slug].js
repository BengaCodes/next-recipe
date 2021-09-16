import axios from 'axios'
import React, { useState } from 'react'
import { sanityClient, urlFor, usePreviewSubscription, PortableText } from '../../lib/sanity'


const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  mainImage,
  ingredient[]{
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions,
  likes
}`

const SingleRecipe = ({ data }) => {
  const [likes, setLikes] = useState(data?.recipe?.likes)
  

  const addLikes = async () => {
    try {
      const res = await axios.post('/api/handle-likes', { _id: recipe._id })
      setLikes(res.data.likes)
    } catch (err) {
      console.log(err)
    }
  }

  const { recipe } = data

  return (
    <article className="recipe">
      <h1>{recipe?.name}</h1>
      <button className="recipe__likes" onClick={addLikes}>{likes} {' '} ❤️</button>
      <main className="recipe__content">
        <img src={urlFor(recipe?.mainImage).url()} alt={recipe?.name} width="450" height="600" />
        <div className="recipe__content--breakdown">
          <ul className="recipe__content--ingredients">
            {
              recipe.ingredient?.map(ingredient => <li className="recipe__content--ingredients--ingredient" key={ingredient.ingredient.name}>{ingredient.ingredient.name}
                <br />
                {ingredient.wholeNumber}
                {ingredient.fraction}
                {' '}
                {ingredient.unit}
              </li>)
            }
          </ul>
          <PortableText blocks={recipe?.instructions} />
        </div>
      </main>
    </article>
  )
}

export default SingleRecipe


export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)] {
      "params": {
        "slug": slug.current
      }
    }`
  )

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const recipe = await sanityClient.fetch(recipeQuery, { slug })

  return {
    props: { data: { recipe } }
  }

}