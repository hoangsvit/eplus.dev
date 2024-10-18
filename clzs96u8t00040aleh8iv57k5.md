---
title: "Crippling Facebook"
seoTitle: "Crippling Facebook"
seoDescription: "Facebook works with advertisers to target you. These instructions are one of the many ways to begin crippling that relationship. When AI targeting is crippl"
datePublished: Tue Aug 13 2024 10:01:56 GMT+0000 (Coordinated Universal Time)
cuid: clzs96u8t00040aleh8iv57k5
slug: crippling-facebook
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1723543232986/2b5b78ca-e543-46cf-864c-353afe6c7fd6.png
ogImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1723543304195/de0f915c-38d1-44a7-b306-4456764113f4.png
tags: crippling-facebook

---

Facebook works with advertisers to target you. These instructions are one of the many ways to begin crippling that relationship. When AI targeting is crippled, your psychosecurity improves :)

1. On your desktop machine, goto [https://accountscenter.facebook.com/ads/audience\_based\_advertising](https://accountscenter.facebook.com/ads/audience_based_advertising)
    
2. Maximize the browser window
    
3. Press F12 and click on the Console tab
    
4. Select the code below, copy it, paste it upon the Console line (The area next to the &gt; character in the Console window), and press enter:
    

```javascript
const i18n = {
  en: {
    seeMore: 'See more',
    theyUploaded: 'They uploaded or used a list to reach you.',
    dontAllow: 'Don\'t allow',
    back: 'Back'
  },
  br: {
    seeMore: 'Ver mais',
    theyUploaded: 'O anunciante carregou',
    dontAllow: 'Não permitir',
    back: 'Voltar'
  }
  // Feel free to add more languages here!
}

const delay = () => new Promise(resolve => setTimeout(resolve, 3000))

const getElementsByAriaLabel = (label) => document.querySelectorAll(`[aria-label="${label}"]`)

const getElementsByRoleAndWidth = (role, width) => 
    Array.from(document.querySelectorAll(`[role="${role}"]`)).filter(el => el.clientWidth === width)

const getElementsByText = (text) => Array.from(document.querySelectorAll('*')).filter(el => 
    Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && node.textContent.includes(text))
)

const wait = async (watcher, timeout = 10000, interval = 100) => {
  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    const checkForElement = () => {
      const elements = watcher()

      if (elements.length > 0) {
        clearInterval(intervalId)
        resolve(elements);
      } else if (Date.now() - startTime > timeout) {
        clearInterval(intervalId)
        reject(new Error(`Timeout: Elements not found`))
      }
    }

    const intervalId = setInterval(checkForElement, interval)

    checkForElement()
  })
}

async function decouple(options = {}) {
  const offset = options.offset
  const lang = options.lang || 'en'

  getElementsByText(i18n[lang].seeMore).forEach(el => el.click())
  await delay()

  const ads = getElementsByRoleAndWidth('listitem', 508).slice(offset)
  let i = 0

  for (const ad of ads) {
    console.log(i, ad.childNodes[0].textContent)
    ad.childNodes[0].click()
    await delay()

    const a = await wait(() => getElementsByText(i18n[lang].theyUploaded))
    a[0].click()
    await delay()

    const b = await wait(() => getElementsByText(i18n[lang].dontAllow))
    b[1].click()
    await delay()

    const c = await wait(() => getElementsByText(i18n[lang].dontAllow))
    c[0].click()
    await delay()

    const d = await wait(() => getElementsByAriaLabel(i18n[lang].back))
    d[2].click()
    await delay()

    const e = await wait(() => getElementsByAriaLabel(i18n[lang].back))
    e[2].click()
    await delay()

    i += 1
  }
}

decouple()
```

5. Watch as your slowly unsubscribe from all advertisers
    
6. Don't click or interact with the browser at all while this is going on. Go do laundry or something.
    
7. Enjoy cutting off advertisers that hate you :)
    
8. If you have hundreds of advertisers, this script will most likely not get all of them on the first pass. In the console are numbers next to the name of each advertiser. You can restart the process manually and specify the offset based on the last number in the console:
    

```javascript
// If the last console output was "250 Dick's Sporting Goods", then do the following:
decouple({ offset: 250 })
```

9. If you want to use another language, check out the `i18n` object and pick your language from one of it's keys. For example, to deal with Brazilian (`br`), you'd use the following:
    

```javascript
decouple({ lang: 'br' })
```

To do and offset in a different language, it would look ilke this:

```javascript
decouple({ offset: 250, lang: 'br' })
```