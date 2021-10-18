import React, { useEffect, useState } from "react";
import { getProducts } from "../../requests";

import "../../styles/styles.scss";
import CompareItemHeader from "../CompareItemHeader";
import styles from "./App.module.scss";

const App = () => {
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const areNotFeature = [
    "salePrice",
    "manufacturerName",
    "grossPrice",
    "BUP_UOM",
    "BUP_Value",
    "uom",
    "productImage",
    "BUP_Conversion",
    "minQuantity",
    "manufacturerImage",
    "name",
    "sku",
    "listPrice",
    "channel",
    "display",
    "atp",
  ];

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => {
        setProducts(res.data.products);
        setShowProducts(res.data.products.map((item) => item.sku));
        transformKeys(res.data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const transformKeys = (products) => {
    let keys = Object.keys(products[0])
      .filter((item) => !areNotFeature.includes(item))
      .sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
    keys.unshift("badges");
    keys = [...new Set(keys)];

    const keysWithDiff = keys.map((item) => {
      return {
        key: item,
        hasDiff: products.every((x) => x[item] == products[0][item]),
      };
    });
    setKeys(keysWithDiff);
  };

  console.log(showProducts);

  return (
    <div className="container-fluid">
      <div className={styles.compare__title}>
        <h1>{`${products.length} producten vergelijken`}</h1>
      </div>
      <div className="row">
        <div className={`col-xs-3 ${styles.compare__aside}`}>
          <h2>Je selectie</h2>
          <ul className={styles.selectedProductsList}>
            {products.map((item) => {
              return <li key={item.Artikelnummer}>{item.name}</li>;
            })}
          </ul>
        </div>
        <div className={`col-xs-9 ${styles.compare__content}`}>
          <div className="row">
            {products.map((item) => {
              if (showProducts.includes(item.sku)) {
                return (
                  <CompareItemHeader key={item.Artikelnummer} data={item} />
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className={`${styles.compare__content}`}>
        {keys.map((keyItem) => {
          return (
            <div key={keyItem.key} className="row">
              <div className="col-xs-3">{keyItem.key}</div>
              {products.map((productItem) => {
                if (showProducts.includes(productItem.sku)) {
                  if (keyItem.key === "badges") {
                    return (
                      <div key={productItem.sku} className="col-xs">
                        {productItem[keyItem.key].split("|").map((badge) => {
                          return <img key={badge} src={badge} />;
                        })}
                      </div>
                    );
                  } else {
                    return (
                      <div key={productItem.sku} className="col-xs">
                        {productItem[keyItem.key]}
                      </div>
                    );
                  }
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
