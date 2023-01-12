import { store } from "./store";

const $currentAssetValue = document.querySelector(".current-asset-value");
const $currentAssetInput = document.querySelector(".current-asset-input");
const $currentAssetButton = document.querySelector(".current-asset-button");
const $addItemButton = document.querySelector(".add-item-button");
const $addItemDetail = document.querySelector(".add-item-detail");
const $addItemDetailButton = document.querySelector(
  ".add-item-detail > button"
);
const $addItemCategory = document.querySelector("#item-category");
const $addItemPrice = document.querySelector("#item-price");
const $addItemDescription = document.querySelector("#item-description");
const $sectionHistory = document.querySelector(".history");

init();

function init() {
  initCurrentAsset();
  initAddAsset();
  initRenderList();
  addEventListener();
}

function initCurrentAsset() {
  $currentAssetValue.textContent = store.currentFunds.toLocaleString();
  $currentAssetInput.value = store.currentFunds;
}

function initAddAsset() {
  if (store.isFirstEdit) return;
  toShow($addItemButton);
}

function initAddItemInput() {
  $addItemCategory.value = "";
  $addItemDescription.value = "";
  $addItemPrice.value = "";
}

function initRenderList() {
  renderList();
}

function addEventListener() {
  $currentAssetValue.addEventListener("click", function (event) {
    if (!store.isFirstEdit) return;
    toHidden(event.target);
    toShow($currentAssetInput);
    toShow($currentAssetButton);

    $currentAssetInput.focus();
  });

  $currentAssetButton.addEventListener("click", function (event) {
    toHidden(event.target);
    toHidden($currentAssetInput);
    toShow($currentAssetValue);
    toShow($addItemButton);

    store.isFirstEdit = false;
  });

  $addItemButton.addEventListener("click", function (event) {
    toHidden(event.target);
    toShow($addItemDetail);
  });

  $addItemDetailButton.addEventListener("click", function (event) {
    if (!validateRequired()) return alert("필수항목이 누락되었습니다.");
    if (!validatePrice())
      return alert("현재 자산 이상의 금액을 작성하셨습니다.");

    const isSuccess = addNewHistory();
    if (!isSuccess) {
      alert("소비내역 저장에 실패했습니다.");
      return;
    }

    toHidden($addItemDetail);
    toShow($addItemButton);
    initAddItemInput();

    renderList();
  });

  $sectionHistory.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.className.includes("delete-button")) return;

    const itemId = element.dataset.itemid;
    const dateId = element.dataset.dateid;

    store.detailList[dateId] = store.detailList[dateId].filter(
      ({ id }) => id !== Number(itemId)
    );

    renderList();
  });
}

function addNewHistory() {
  try {
    store.currentFunds -= $addItemPrice.value;
    store.detailList[store.todayId].push({
      createAt: new Date(),
      id: Date.now(),
      description: $addItemDescription.value,
      category: $addItemCategory.value,
      amount: Number($addItemPrice.value),
      fundsAtTheTime: Number(store.currentFunds),
    });
    return true;
  } catch (error) {
    return false;
  }
}

function renderList() {
  $sectionHistory.innerHTML = store.dateList
    .map(({ date, id: dateId }) => {
      const detail = store.detailList[dateId];
      if (!detail.length) return "";

      return ` <article class="history-per-day">
        <p class="history-date">${date}</p>
        ${detail
          .reverse()
          .map(
            ({
              id,
              description,
              category,
              createAt,
              amount,
              fundsAtTheTime,
            }) => {
              return `<section class="history-item">
                <section class="history-item-column">
                  <div class="create-at">${createAt.toLocaleDateString()}</div>
                  <div class="history-detail">
                    <div class="history-detail-row history-detail-title">
                      <p>${description}</p>
                    </div>
                    <div class="history-detail-row history-detail-subtitle">
                      <p>${category}</p>
                      <p>
                        ${amount.toLocaleString()}
                        <span>원</span>
                      </p>
                    </div>
                  </div>
                  <div class="delete-section">
                    <button class="delete-button" data-dateId=${dateId} data-itemId=${id}>🗑</button>
                  </div>
                </section>
                <section class="history-item-caption">
                  <p>
                    <span>남은 자산</span>
                    <span>${fundsAtTheTime.toLocaleString()}</span>
                    <span>원</span>
                  </p>
                </section>
              </section>`;
            }
          )
          .join("")}</article>`;
    })
    .join("");
}

function validateRequired() {
  const result =
    Boolean($addItemCategory.value) &&
    Boolean($addItemDescription.value) &&
    $addItemPrice.value > 0;
  return result;
}

function validatePrice() {
  const result = store.currentFunds - $addItemPrice.value >= 0;
  return result;
}

function toShow(node) {
  node.className = node.className.replace("v-none", "v-show");
}

function toHidden(node) {
  node.className = node.className.replace("v-show", "v-none");
}
