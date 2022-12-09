import { json } from "express";

const recommendLC = (category, podCategory) => {
  let recPA = localStorage.getItem("recPA");

  if (recPA == null) {
    localStorage.setItem(
      "recPA",
      JSON.stringify([
        {
          category: category,
          podCategory: podCategory,
          priority: 1,
        },
      ])
    );

    alert("не было");
  } else if (recPA !== null) {
    alert("было");

    let bilaLiTakayaCategory = false;

    let recPAchange = JSON.parse(recPA).map((value) => {
      console.log(value);

      if (value.category == category) {
        value.priority += 1;
        bilaLiTakayaCategory = true;
        return value;
      } else if (value.category !== category) {
        bilaLiTakayaCategory = false;
      }
    });

    if (!bilaLiTakayaCategory) {
      localStorage.setItem(
        "recPA",
        JSON.stringify([
          ...recPA,
          {
            category: category,
            podCategory: podCategory,
            priority: 1,
          },
        ])
      );
    }

    console.log(recPAchange);
    console.log(bilaLiTakayaCategory);
  }
};

export default recommendLC;
