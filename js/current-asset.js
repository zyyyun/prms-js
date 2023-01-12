exfunction initCurrentAsset() {
  $currentAssetValue.textContent = store.currentFunds.toLocaleString();
  $currentAssetInput.value = store.currentFunds;
}
