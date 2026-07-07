export type ProductCategory = 'おすすめ' | 'フルーツ' | 'やさい' | 'その他'

export type Ingredient = {
    id: string
    name: string
    price: number
    image: string
    color: string
}

export type OsusumeIngredients = {
    name: string
    price: number
    image: string
    color: string
    ingredients: Omit<Ingredient, 'id'>[]
}