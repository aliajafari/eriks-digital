import React from "react";

import styles from "./CompareItemHeader.module.scss";
import Trash from "../../styles/images/icons/trash-bin.png";

function CompareItemHeader({ data, onClickRemoveItem }) {
  return (
    <div className="col-xs">
      <div className={`${styles.compareItemHeader}`}>
        <button
          onClick={() => onClickRemoveItem(data.sku)}
          className={styles.trashIcon}
          type="button"
        >
          <img src={Trash} />
        </button>
        <div>
          <img
            className={styles.productImage}
            src={`https://via.placeholder.com/150`}
          />
          <h2 className={styles.title}>{data.name}</h2>
          <div className={styles.price}>{data.salePrice}</div>
          <div className={styles.subPrice}>per stuck / excl. btw</div>
        </div>
      </div>
    </div>
  );
}

export default CompareItemHeader;
