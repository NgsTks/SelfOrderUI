import type { Ingredient, ProductCategory, OsusumeIngredients } from '../types/product'
import bananaImage from '../assets/images/osusume_banana.png'

export const Products: Record<ProductCategory, Omit<Ingredient, 'id'>[]|OsusumeIngredients[]> = {
    おすすめ: [
        {
            name: 'バナナ',
            price: 100,
            image: bananaImage,
            color: '#EFEFB7',
            ingredients: [
                {
                    image: bananaImage,
                    name: 'バナナ',
                    price: 100,
                    color: '#EFEFB7',
                },
                {
                    image: bananaImage,
                    name: 'バナナ',
                    price: 100,
                    color: '#EFEFB7',
                },
                {
                    image: bananaImage,
                    name: 'バナナ',
                    price: 100,
                    color: '#EFEFB7',
                },
                {
                    image: bananaImage,
                    name: 'バナナ',
                    price: 100,
                    color: '#EFEFB7',
                },
            ]
        },
    ],
    フルーツ: [
        {
            image: bananaImage,
            name: 'バナナ',
            price: 120,
            color: '#EFEFB7',
        },
    ],
    やさい: [
        {
            image: bananaImage,
            name: 'ほうれん草',
            price: 90,
            color: '#7ac962',
        },
    ],
    その他: [
        {
            image: bananaImage,
            name: 'バナナ',
            price: 110,
            color: '#EFEFB7',
        },
    ],
}

// テスト用ダミーAPI（必要なら使用）
export const fetchProductsByCategory = async (category: ProductCategory): Promise<Omit<Ingredient, 'id'>[]|OsusumeIngredients[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return Products[category]
}