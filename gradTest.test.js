function createMenuData(data) {

var filteredParents = findUniqueEntries(data);
var menuArray = createObjArray(filteredParents,data);
var filteredArray = delEmptyEntries(menuArray);

return filteredArray;
}

//Remove suffix and condense to unique main menu entries
function findUniqueEntries(data) {
  let parentArray = [];
  var prefixRegex = /\/.*$/g;

  data.map(str => {
    var arrayElement = str.replace(prefixRegex, "");
    parentArray.push(arrayElement);
  });

  var uniqueArray = [...new Set(parentArray)];

  return uniqueArray;
}

//Return submenu data for each unique entry
function createObjArray(uniqueEntries, strArr) {
  let strArray = [];

  uniqueEntries.map((uStr) => {

    var nwObj = {
      data: [],
      title: uStr,
    };

    var suffixRegex = /[^/]*$/g;

    strArr.map((strData) => {
      if (strData.indexOf(uStr) >= 0) {
        if (strData.match(suffixRegex)) {
          formattedElement = strData.match(suffixRegex).toString().replace(",", "");
          if (formattedElement != uStr) {

            nwObj.data.push(formattedElement);
          }
        }

      }
    }
    );
    strArray.push(nwObj);
  }
  );

  return strArray;
}

//Delete entries where data attribute is empty
function delEmptyEntries(menuArr){
  var nwStrArray = menuArr.filter(item => (item.data.length > 0));

  return nwStrArray;
}

describe("menu Data Generator", () => {
  it("creates correct data structure ", () => {
    const data = [
      "parent1/parent1child",
      "parent1/parent1child2",
      "parent2/parent2child",
      "parent2/parent2child2",
      "parent1/parent1child3",
      "parent3",
      "parent3/parent3child1",
      "parent4"
    ];

    const expectedResult = [
      {
        title: "parent1",
        data: ["parent1child", "parent1child2", "parent1child3"]
      },
      { title: "parent2", data: ["parent2child", "parent2child2"] },
      { title: "parent3", data: ["parent3child1"] }
    ];

    const actualResult = createMenuData(data);
    expect(actualResult).toMatchObject(expectedResult);
  });
});