import React from 'react'
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
  instructions
}`

const SingleRecipe = ({ data }) => {

  const { recipe } = data

  return (
    <article className="recipe">
      <h1>{recipe?.name}</h1>
      <main className="recipe__content">
        <img src={urlFor(recipe?.mainImage).url()} alt={recipe?.name} width="380" height="600" />
        <div className="recipe__breakdown">
          <ul className="recipe__ingredients">
            {
              recipe.ingredient?.map(ingredient => <li className="recipe__ingredients--ingredient" key={ingredient.ingredient.name}>{ingredient.ingredient.name}
                <br />
                {ingredient.wholeNumber}
                {ingredient.fraction}
                {' '}
                {ingredient.unit}
              </li>)
            }
          </ul>
          {/* <ul>
            {
              recipe.instructions?.map(instruction => <li key={instruction._key}>{instruction.children[0].text}</li>)
            }
          </ul> */}
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