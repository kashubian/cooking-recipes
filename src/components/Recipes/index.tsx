import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { fetchRecipes } from 'api'
import { IRecipe } from 'types'
import Button from 'components/common/Button'
import Loader from 'components/common/Loader'

import styles from './Recipes.module.scss'
import RecipeNotFound from './RecipeNotFound'

function Recipes() {
  const [recipes, setRecipes] = useState<Array<IRecipe>>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const location = useLocation()
  const navigate = useNavigate()
  const recipeName = location.state?.recipeName
  const isLoaded = recipes.length > 0
  const isRecipesListEmpty = recipes.length === 0

  useEffect(() => {
    fetchRecipes(recipeName).then((response) => {
      setRecipes(response.data.results)
      setIsLoading(false)
    })
  }, [recipeName, navigate])

  return (
    <div className={styles.container}>
      {isLoading && createPortal(<Loader />, document.body)}
      {isLoaded && (
        <ul className={styles.items}>
          {recipes.map((recipe: IRecipe) => (
            <li className={styles.item} key={recipe.id}>
              <img
                className={styles.photo}
                src={recipe.image}
                alt={recipe.title}
              />
              <h2 className={styles.title}>{recipe.title}</h2>
              {/* TODO: link redirects to details of a recipe */}
              <Link to="/" className={styles.link}>
                <Button>View details</Button>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && isRecipesListEmpty && <RecipeNotFound />}
    </div>
  )
}

export default Recipes
