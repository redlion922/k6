# K6 Load Testing Project

這個專案包含了一些 K6 的負載測試腳本，用於測試不同的 API 和功能。

## 設置

1. 安裝 [K6](https://k6.io/docs/getting-started/installation/) 或 [Docker](https://docs.docker.com/get-docker/)。
2. 克隆這個儲存庫。
3. 如果你使用的是 Docker，請先構建 Docker 映像：

   ```bash
   docker build -t k6-test-image .
   ```

## 使用方式

### 1. 基本執行

若要直接運行某個 K6 測試腳本（例如 `m-shopping-cart-test.js`），可以使用以下命令：

```bash
k6 run script.js
```

### 2. 使用配置文件執行

如果你有一個配置文件（例如 `config.json`），你可以這樣運行測試：

```bash
k6 run --config config.json script.js
```

這樣，K6 將會根據 `config.json` 文件中的配置來執行測試腳本。

### 3. 自定義虛擬使用者數量和持續時間

你可以在命令行中自定義虛擬使用者數量（VUs）和測試持續時間，而不使用配置文件：

```bash
k6 run --vus 50 --duration 1m script.js
```

這個命令將以 50 個虛擬使用者並持續 1 分鐘的設置來運行測試。

### 4. 使用 Docker 執行

如果你使用 Docker 來運行 K6 測試腳本，可以使用以下命令：

```bash
docker run --rm k6-test-image /scripts/script.js
```

### 5. 使用 Docker 並指定配置文件

在 Docker 中，你也可以指定一個配置文件來運行測試：

```bash
docker run --rm -v $(pwd)/config.json:/config/config.json k6-test-image --config /config/config.json /scripts/m-shopping-cart-test.js
```

這個命令會將當前目錄下的 `config.json` 文件映射到容器內部，並根據該配置文件來運行測試腳本。

## 配置文件說明

`config.json` 是一個 K6 的配置文件，你可以在其中設定各種參數，例如虛擬使用者數量（VUs）、測試持續時間、目標 URL 等。以下是 `config.json` 的範例內容：

```json
{
    "vus": 20,
    "duration": "2m",
    "thresholds": {
        "http_req_duration": ["p(95)<500"]
    }
}
```

### 配置文件參數說明

- **`vus`**: 虛擬使用者數量。
- **`duration`**: 測試持續時間。
- **`thresholds`**: 設定測試閾值條件，用於檢查響應時間等性能指標。

## 查看結果

測試完成後，結果將顯示在終端中，包含請求數量、成功率、響應時間等摘要數據。你可以根據這些結果來分析系統性能，並進行相應的優化。

## 自定義與擴展

你可以根據需求修改 `m-shopping-cart-test.js` 測試腳本或新增其他腳本，然後按照上述方法運行和測試。


```
k6-project/
│
├── test-script.js  # 壓力測試腳本
├── k6-config.json  # 測試執行腳本
└── README.md
```
