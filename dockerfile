# 使用官方 K6 映像作為基礎映像
FROM grafana/k6:latest

# 創建一個目錄來存放腳本
WORKDIR /scripts

# 將當前目錄下的所有測試腳本複製到容器中的 /scripts 目錄
COPY . /scripts/

# 設定默認的 ENTRYPOINT，允許在運行時指定腳本
ENTRYPOINT ["k6", "run"]
