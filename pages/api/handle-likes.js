import { sanityClient } from '../../lib/sanity'



sanityClient.config({
  token: process.env.TOKEN
})



export default async function likeButtonHandler(req, res) {
  const { _id } = req.body
  const data = await sanityClient

    .patch(_id)
    .setIfMissing({ likes: 0 })
    .inc({ likes: 1 })
    .commit()
    .catch(err => console.log(err))
  res.status(200).json({ likes: data.likes })
} 