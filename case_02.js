import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
    vus: 1, // 虛擬使用者數量
    duration: '10s', // 測試持續時間
};

export default function () {
    const headers = {
        'Cookie': 'cf_clearance=mOqrzgYkUygEFWghISE6ZsTKUvc3UL28.iyZgC0mBLY-1716950312-1.0.1.1-lB.aDQpIl1Yqs7wUQKHXgokxv1KAkWMT7yXkYZS2dhF7dgLzh9SZK64TVv9k6nPqs3F_ZdcnEJeSF19eVVHfBQ; _ts_id=20240712200839300238.1720778015; IS_HRU=N; itemUploadOtpUrl=https%3A%2F%2Fmybidu.stage.ruten.com.tw%2Fupload%2Fitem_initial.php; itemUploadOtpCookieRecords=NnQ18Xqw7PPfXH1DbDYkl0jez14XKGpg%2F1Sw530iNcvKZAduOGNNb3A47hQmkavMPYpC6lntKFFdmnIRxX0gajdXglEVCKQv4mUwKKv9A6pGKKF2O8JigvrGaFCwH7l9dicuc1GJ5TMMFETILBpaRHPiMOicizBlCik4TtJAc2%2F1bpAP7TGc%2Bg3yiMouGe6ySp9Ae4cyM3FYvGPGut8Nh2hifJHotghHRDxyhiUYt4DrKZy7NNQk9lbt6fkKXDBVfwx%2Bo%2Bi6rAFNBCXB4EWEJC3MWdR4sHYvntNbTMaoGtL0Q3NsY%2FuPwdMj9z6j5Uul3%2FkReTILB%2BpMeWFrgHZ6wnIdHgr%2FRDUlAXKSrQ1L%2FS5UpI1E; _cfuvid=IkDLk.zKFKsIoCYQtAUE6iH0C7siZjb3KtiRZ_B_o8U-1721876222315-0.0.1.1-604800000; user_search_order_list={%22d%22:{%22s%22:%22%22%2C%22e%22:%22%22%2C%22p%22:%2224%22}%2C%22m%22:{}}; fwchk=vVSDtVg/jWrhIkiyyNnN4HggqNs0004; __cf_bm=XWDvtJWg1YDQ_.3x9kK9Bt.Bt0BuawdL2LtOcNEatR0-1723621501-1.0.1.1-SH1xmPVRVXmOpBxWq3zy5pQjSn.9epQ.MPKvNoaYS50mbj9KX0qF2omH9rwhsYYOGXswVRoU4MoeFM_lWy89xQ; _ts_session=fyvxyk9q1z; bid_member=JkGMqVgyfipjhsW%2B5w9uKtt8lzKrZu8wHLz24stFUcLq%2B%2B4u2etPGn1H%2FYx7wj8eL2ienv2yGM%2FalJL1eAl0dTHKVFAjsoif4YddJjeBAtWqaG4XNSlCQaqepL4VGzxDOs1d6hTpYoUVdOF749fSGifhz2uUo1GKReZgmxTX%2FnUT%2F2fD4YEc1qAfDuvQWLzAPJ9xFhwo%2BITEcmxKxjECi%2B%2F54OkuVwFLnxP5naKU4Lcbb4eX9cemweOlN60KPIwcrw9vADXMyQWDuRRJst47rORvkq98hUYoMSdMuVOE2BgesModtMdb7KofWOEt01%2F%2BacUVYBxK5qnI7bsUEbPY2D8HkIAiGNsCCdSwRHEUMWZFaOKjOGRXqc0%3D; bid_rid=17365400; bid_nick=1333131347375647e656475727; login=1; login_status_code=1; rt_header_info=eyJ1c2VyX25pY2siOiJydXRlbnRlc3QxMTMxIiwibGFzdF9sb2dpbl90aW1lIjpudWxsLCJsYXN0X2xvZ2luX2NoZWNrIjpmYWxzZX0=; UsePlatform=pc; _ts_session_spent=158275',
        'User-Agent': 'ruten-test-by-vegeta',
    };

    group("M新購物車測試", function () {

        // 首頁
        let res1 = http.get('https://mybid.ruten.com.tw/mobile/list_cart.php', { headers: headers });
        check(res1, {
            '首頁狀態為 200': (r) => r.status === 200,
        });

        // 取購物車列表
        let res2 = http.get('https://rapi.ruten.com.tw/api/carts/v1/rutentest1131/list', { headers: headers });
        check(res2, {
            '購物車列表狀態為 200': (r) => r.status === 200,
        });

        // 取購物車商品總數
        let res3 = http.get('https://rapi.ruten.com.tw/api/carts/v1/rutentest1131/amount', { headers: headers });
        check(res3, {
            '購物車商品總數狀態為 200': (r) => r.status === 200,
        });

        // 查詢露幣餘額 (呼叫 Pi API)
        let res4 = http.get('https://rapi.ruten.com.tw/api/users/v1/rutentest1131/rpoints/balance', {
            headers: headers,
        });
        check(res4, {
            '查詢露幣餘額狀態為 200': (r) => r.status === 200,
        });

        // 取得可用折扣
        const payload = 'refer=cart&seller_nick=zzzlin8899&total_item_price=290&cart_no_object=%7B%2223432387579843%22%3A%7B%22g_no%22%3A%2221651838082239%22%2C%22price%22%3A290%2C%22amount%22%3A1%2C%22g_class%22%3A%2200200004000300010014%22%7D%7D&pay_way=&deliver_way=&device=desktop&discount=0';
        let res5 = http.post('https://rapi.ruten.com.tw/api/events/v1/vouchers/get', payload, {
            headers: headers,
        });
        check(res5, {
            '取得可用折扣狀態為 200': (r) => r.status === 200,
        });

    });
}
