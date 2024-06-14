import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = new URL('https://6367b246edc85dbc84d9ba5d.mockapi.io/products');

    const fetchPizzas = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const result = await response.json();
        setPizzas(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {loading ? (
              <div className="loading">Загрузка...</div>
            ) : (
              pizzas.map((item) => (
                <PizzaBlock
                  title={item.title}
                  img={item.image}
                  key={item.id}
                  dough={item.dough}
                  size={item.size}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
