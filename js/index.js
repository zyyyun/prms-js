import { initStore } from "./store";
import { renderHistoryList, addHistoryListEventListener } from "./history-list";
import {
  updateCurrentAsset,
  addCurrentAssetEventListener,
} from "./current-asset";
import { renderAddItemButton, addItemEditEventListener } from "./add-item";

init();

function init() {
  initStore();

  addEventListeners();

  renderAddItemButton();
  render();
}

function addEventListeners() {
  addCurrentAssetEventListener();
  addItemEditEventListener();
  addHistoryListEventListener();
}

function render() {
  updateCurrentAsset();
  renderHistoryList();
}
