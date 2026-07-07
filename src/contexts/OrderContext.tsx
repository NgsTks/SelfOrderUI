import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Ingredient, OsusumeIngredients } from '../types/product';

// 1. データの形（型）を決める
interface OrderContextType {
  orderList: Ingredient[];
  addIngredient: (ingredient: Omit<Ingredient, 'id'>) => void;
  deleteIngredient: (ingredientId: string) => void;
  addOsusumeIngredients: (osusumeIngredients: OsusumeIngredients) => void;
  resetIngredients: () => void;
  sumPrice: number;
  getQuantity: (ingredientId: string) => number;
}

// 2. Context（データの通り道）を作る
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// 3. Provider（データを実際に保持して、子供たちに配信するコンポーネント）
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);

  const createUniqueId = (list: Ingredient[], name: string) => {
    const count = list.filter((product) => {
      const baseName = product.id.replace(/-\d+$/, "");
      return baseName === name;
    }).length;
    return `${name}-${count}`;
  };

  const addIngredient = (product: Omit<Ingredient, 'id'>) => {
    setIngredientsList((prev) => [
      ...prev,
      { ...product, id: createUniqueId(prev, product.name) },
    ]);
  };

  const deleteIngredient = (name: string) => {
    const count = getQuantity(name);
    if (count === 0) return;
    const ingredientId = `${name}-${count - 1}`;
    setIngredientsList((prev) => prev.filter((product) => product.id !== ingredientId));
  };

  const addOsusumeIngredients = (osusumeIngredients: OsusumeIngredients) => {
    setIngredientsList((prev) => {
      const next = [...prev];

      osusumeIngredients.ingredients.forEach((ing) => {
        next.push({
          ...ing,
          id: createUniqueId(next, ing.name),
        });
      });

      return next;
    });
  };

  const resetIngredients = () => {
    setIngredientsList([]);
  };

  const sumPrice = ingredientsList.reduce((sum, product) => sum + product.price, 0);

  const getQuantity = (name: string) => {
    return ingredientsList.filter((product) => {
      const baseName = product.id.replace(/-\d+$/, "");
      return baseName === name;
    }).length;
  };

  return (
    <OrderContext.Provider
      value={{
        orderList: ingredientsList,
        addIngredient,
        deleteIngredient,
        addOsusumeIngredients,
        resetIngredients,
        sumPrice,
        getQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('OrderProviderの中で使用してください');
  return context;
};