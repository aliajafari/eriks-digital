import React, { Fragment, useEffect, useState } from "react";
import { getProducts } from "../../requests";

import "../../styles/styles.scss";
import CompareItemHeader from "../CompareItemHeader";
import Row from "../Row";
import RowTable from "../RowTable";
import SelectedItems from "../SelectedItems";
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
        const showProductsArray = res.data.products.map((item) => item.sku);
        setProducts(res.data.products);
        transformKeys(res.data.products, showProductsArray);
        setShowProducts(showProductsArray);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
      });
  }, []);

  const transformKeys = (products, showProducts) => {
    const productItem = products[0];

    const newNewProducts = products.filter((item) =>
      showProducts.includes(item.sku)
    );

    console.log("newNewProducts", newNewProducts);

    let keys = Object.keys(productItem)
      .filter((item) => !areNotFeature.includes(item))
      .sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
    keys.unshift("badges");
    keys = [...new Set(keys)];

    const keysWithDiff = keys.map((key) => {
      console.log(key, newNewProducts.every((x) => x[key] === productItem[key]));
      return {
        key,
        hasDiff: !newNewProducts.every((x) => x[key] === productItem[key]),
      };
    });
    setKeys(keysWithDiff);
  };

  const handlerOnChangeSelectedItem = (checked, sku) => {
    if (checked) {
      const newShowProducts = [...showProducts, sku];
      setShowProducts(newShowProducts);
      transformKeys(products, newShowProducts);
    } else {
      const newShowProducts = [...showProducts, sku].filter(
        (item) => item !== sku
      );
      setShowProducts(newShowProducts);
      transformKeys(products, newShowProducts);
    }
  };

  const handlerRemoveSelectedItem = (sku) => {
    const newProducts = [...products].filter((item) => item.sku !== sku);
    setShowProducts([...showProducts].filter((item) => item !== sku));
    setProducts(newProducts);
    transformKeys(newProducts);
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className={`row ${styles.compare__title}`}>
          <h1>{`${products.length} producten vergelijken`}</h1>
        </div>
      </div>
      <div className="wrapper">
        <div className={`container-fluid ${styles.responsiveContainer}`}>
          <div className="row">
            <div className={`col-xs-3 ${styles.compare__aside}`}>
              <SelectedItems
                onChangeSelectedItem={handlerOnChangeSelectedItem}
                products={products}
                showProducts={showProducts}
              />
            </div>
            <div className={`col-xs-9 ${styles.compare__content}`}>
              <div className="row">
                {products.map((item) => {
                  if (showProducts.includes(item.sku)) {
                    return (
                      <CompareItemHeader
                        onClickRemoveItem={handlerRemoveSelectedItem}
                        key={item.Artikelnummer}
                        data={item}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              {keys.map((keyItem) => {
                return (
                  <Row
                    key={keyItem.key}
                    keyItem={keyItem}
                    products={products}
                    showProducts={showProducts}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
