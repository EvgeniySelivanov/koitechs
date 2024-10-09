import React, { useState, useMemo } from 'react';

const Test = ({products}) => {
  const [filter, setFilter] = useState('');
  const [sortOption, setSortOption] = useState('price');
console.log(sortOption);



  // Используем useMemo для мемоизации отфильтрованных и отсортированных данных
  const filteredAndSortedProducts = useMemo(() => {
    console.log('Filtering and sorting products...');
    // Фильтруем продукты по названию
    let filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(filter.toLowerCase())
    );

    // Сортируем продукты
    if (sortOption === 'price') {
      console.log('sortOption === price');
      
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'rating') {
      console.log('sortOption === rating');
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }
console.log('filteredProducts',filteredProducts);

    return filteredProducts;
  }, [products, filter, sortOption]); // Депенденции: пересчет произойдет только при изменении этих значений

  return (
    <div>
      <h1>Product List</h1>

      {/* Фильтр по названию продукта */}
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Сортировка */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        <option value="price">Sort by Price</option>
        <option value="rating">Sort by Rating</option>
      </select>

      {/* Отображение отфильтрованных и отсортированных продуктов */}
      <ul>
        {filteredAndSortedProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - {product.rating} Stars
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
