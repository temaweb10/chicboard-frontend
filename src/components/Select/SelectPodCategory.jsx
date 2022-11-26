import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "../../pages/CreatePost/CreatePost.module.scss";
function SelectPodCategory({ category, className, setCategory }) {
  const [podCategory, setPodCategory] = useState("");
  return (
    <div className={styles.w100}>
      {category ? (
        <div className={styles.w100}>
          {category == "realty" ? (
            <div>
              <InputLabel id="demo-simple-select-label">
                Под категория
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Под категория"
                value={podCategory}
                className={styles["select-category_2"]}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPodCategory(e.target.value);
                }}
              >
                <MenuItem value="">
                  <em>Выберите категорию</em>
                </MenuItem>
                <MenuItem value={"apartmentSale"}>Продажа квартиры</MenuItem>
                <MenuItem value={"saleHouse"}>Продажа дома</MenuItem>
              </Select>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default SelectPodCategory;
