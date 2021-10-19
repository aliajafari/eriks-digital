import React from "react";
import RowTable from "../RowTable";
import styles from "./Row.module.scss";

function Row({ keyItem, products, showProducts }) {
  return (
    <div
      key={keyItem.key}
      className={`row ${keyItem.hasDiff ? styles.hasDiff : ""} ${
        styles.rowFeature
      }`}
    >
      <div className={`col-xs-3 ${styles.title}`}>{keyItem.key}</div>
      {products.map((productItem) => {
        if (showProducts.includes(productItem.sku)) {
          
          return (
            <RowTable
              keyItem={keyItem}
              productItem={productItem}
              key={productItem.sku}
              classNameFeatureCell={styles.featureCell}
            />
          );
        }
      })}
    </div>
  );
}

export default Row;
