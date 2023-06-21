import React, { useState, useEffect } from 'react';
import './App.scss';
import cn from 'classnames';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

export const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  // const [query, setQuery] = useState('');

  useEffect(() => {
    setProducts(productsFromServer);
    setCategories(categoriesFromServer);
    setUsers(usersFromServer);
  }, []);

  function getCategory(categoryId) {
    const findCategory = categories.find(category => (
      category.id === categoryId));

    return findCategory || null;
  }

  function getUser(ownerId) {
    const findUser = users.find(user => user.id === ownerId);

    return findUser || null;
  }

  const currentProducts = products.map(product => ({
    ...product,
    category: {
      ...getCategory(product.categoryId),
      user: getUser(getCategory(product.categoryId)?.ownerId),
    },
  }));

  // const findSearchName = (value) => {
  //   setQuery(value);

  //   const lowercasedValue = value.trim().toLowerCase();

  //   const visibleUsers = users.filter(user => (
  //     user.name.toLowerCase().includes(lowercasedValue)
  //   ));

  //   setUsers(visibleUsers);
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();

  //   setProducts(prevProducts) => {
  //     const newProducts = {

  //     }
  //   }
  // }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>
              {users.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                >
                  {user.name}
                </a>
              ))}

            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  // value={query}
                  // onChange={event => findSearchName(event.target.value)}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                  />
                </span>
              </p>
            </div>

            <form>
              <div className="panel-block is-flex-wrap-wrap">
                <a
                  href="#/"
                  data-cy="AllCategories"
                  className="button is-success mr-6 is-outlined"
                >
                  All
                </a>

                {categories.map(category => (
                  <a
                    data-cy="Category"
                    className="button mr-2 my-1 is-info"
                    href="#/"
                    key={category.id}
                  >
                    {category.title}
                  </a>

                ))}
              </div>
            </form>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.map(currentProduct => (
                <tr
                  data-cy="Product"
                  key={currentProduct.id}
                >

                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {currentProduct.id}
                  </td>

                  <td data-cy="ProductName">
                    {currentProduct.name}
                  </td>
                  <td data-cy="ProductCategory">
                    {`${currentProduct.category.icon} - ${currentProduct.category.title}`}
                  </td>

                  <td
                    data-cy="ProductUser "
                    className={cn({
                      'has-text-danger':
                          currentProduct.category.user.sex === 'f',
                    }, {
                      'has-text-link':
                        currentProduct.category.user.sex === 'm',
                    })}
                  >
                    {currentProduct.category.user.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
