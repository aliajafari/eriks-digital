import React, { Fragment } from "react";
import styles from "./styles.module.scss";

function SelectedItems({ products, showProducts, onChangeSelectedItem }) {
  return (
    <Fragment>
      <h2>Je selectie</h2>
      <ul className={styles.selectedProductsList}>
        {products.map((item) => {
          return (
            <li key={item.Artikelnummer}>
              <input
                value={item.sku}
                type="checkbox"
                checked={showProducts.includes(item.sku)}
                onChange={(e) =>
                  onChangeSelectedItem(e.target.checked, item.sku)
                }
              />
              <label value={item.sku}>{item.name}</label>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default SelectedItems;
