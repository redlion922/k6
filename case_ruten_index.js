import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
    vus: 2, // 虛擬使用者數量
    duration: '10s', // 測試持續時間
};

export default function () {
    group("新版首頁測試", function () {
        
        // 首頁
        let res1 = http.get('https://www.ruten.com.tw/v2', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        check(res1, {
            '首頁 status is 200': (r) => r.status === 200,
        });

        // header熱門分類
        let res2 = http.get('https://rapi.ruten.com.tw/api/categories/v1/class/header', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        check(res2, {
            'header熱門分類 status is 200': (r) => r.status === 200,
        });

        // open x
        let res3 = http.get('https://ahd.ruten.com.tw/ahd/fetch_ad.php?json=true&zone=1053,fair-0005-cat,fair-0005-item,1056,fair-0011-cat,fair-0011-item,1059,fair-0009-cat,fair-0009-item,1062,fair-0019-cat,fair-0019-item,1065,fair-0023-cat,fair-0023-item', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        check(res3, {
            'open x status is 200': (r) => r.status === 200,
        });

        // 取得個人化分類
        let res4 = http.get('https://rtapi.ruten.com.tw/api/usertag/v1/uid/207409/cate?cache=false', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        check(res4, {
            '取得個人化分類 status is 200': (r) => r.status === 200,
        });

        // 熱搜關鍵字
        let res5 = http.get('https://rtapi.ruten.com.tw/api/search/v3/index.php/core/suggestwords?cateid=0006,0010,0007,0012,0005,0020', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        check(res5, {
            '熱搜關鍵字 status is 200': (r) => r.status === 200,
        });

        // 快閃市集
        let res6 = http.get('https://rapi.ruten.com.tw/api/p13n/v1/flashad', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        check(res6, {
            '快閃市集 status is 200': (r) => r.status === 200,
        });

    });
}
