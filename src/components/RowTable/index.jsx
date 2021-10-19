import React, { Fragment } from "react";
import styles from "./RowTable.module.scss";

function RowTable({ keyItem, productItem }) {
  return (
    <Fragment>
      {keyItem.key === "badges" ? (
        <div key={productItem.sku} className={`col-xs ${styles.featureCell}`}>
          {productItem[keyItem.key].split("|").map((badge) => {
            return <img key={badge} className={styles.badgeItem} src={badge} />;
          })}
        </div>
      ) : (
        <div key={productItem.sku} className={`col-xs ${styles.featureCell}`}>
          {productItem[keyItem.key]}
        </div>
      )}
    </Fragment>
  );
}

export default RowTable;
