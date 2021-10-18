import React from "react";

import styles from "./CompareItem.module.scss";

function CompareItemHeader({ data }) {
  return (
    <div className='col-xs'>
      <div className={`${styles.compareItemHeader}`}>
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
