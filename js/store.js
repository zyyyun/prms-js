/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }
 * detailList {
    todayId: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }
  }
 */
export const store = {
  currentFunds: 0,
  isFirstEdit: true,
  todayId: 0,
  dateList: [],
  detailList: {},
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(sessionStorage.getItem("store"));

  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */
    store.detailList = null;
    store.currentFunds = null;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */
    store.detailList[dateId] = null;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
