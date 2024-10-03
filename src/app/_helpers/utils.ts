import { BizService } from "@app/_services/biz.service"
import { KeyMapping } from "@app/_types/types"

export function getPersonalInfo(personalInfo: any) {
    return {
        "firstName": personalInfo.firstName,
        "middleNames": personalInfo.middleNames,
        "surname": personalInfo.lastName,
        "lastName": personalInfo.lastName,
        "dateOfBirth": personalInfo.dateOfBirth,
        "idDocumentType": personalInfo.idDocument,
        "idDocumentValue": personalInfo.docNumber,
        "gender": personalInfo.gender,
        "maritalStatus": personalInfo.maritalStatus,
        "title": personalInfo.title,
        "titleOther": personalInfo.titleOther,
        "PIN": personalInfo.PIN,
        "nationality": personalInfo.nationality,
        "countryOfResidence": personalInfo.countryOfResidence
    }
}

export function getContacts(contacts: any) {
    return {
        "postalAddress": contacts.postalAddress,
        "postalCode": contacts.postalCode,
        "townCity": contacts.townCity,
        "physicalAddress": contacts.physicalAddress,
        "mobileNo": contacts.mobile,
        "homeNo": contacts.homeNumber,
        "email": contacts.email
    }
}

export function getOccupation(occupation: any) {
    return {
        "occupationType": occupation.typeOfEmployment,
        "occupationNarration": occupation.natureOfBusiness,
        "jobTitle": occupation.role,
        "workplaceName": occupation.nameOfBusiness,
        "workPostalAddress": occupation.workPostalAddress,
        "workPostalCode": occupation.workPostalCode,
        "workTownCity": occupation.workTownOrCity,
        "workPhysicalAddress": occupation.workPhysicalAddress,
        "workPhoneNo": occupation.workPhone,
        "workEmail": occupation.workEmail
    }
}

export function renameKeys<T extends object>(array: T[], keyMapping: KeyMapping): Array<{ [key: string]: any }> {
    return array.map(item => {
        const newItem: { [key: string]: any } = {}
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const newKey = keyMapping[key] || key
                newItem[newKey] = item[key]
            }
        }
        return newItem
    })
}

export function showSpinner() {
    // var node = document.createElement("li")
    var divNode = document.createElement("div")
    var imgNode = document.createElement("img")
    imgNode.src = "../../assets/img/spinner.gif"
    divNode.appendChild(imgNode)
    // document.getElementById('spinnerList')!.appendChild(node)
    document.getElementById('spinnerDiv')!.appendChild(divNode)
}

export function addFnBarItem(kind: string, fn: Function, params: string[], service: BizService) {
    var divNode = document.createElement("div")
    divNode.className = "fnBarItemCols"
    var colNode0 = document.createElement("div")
    var image = document.createElement("img")
    image.className = "fnBarIcon"
    image.alt = 'Download File'
    var colNode1 = document.createElement("div")
    var link = document.createElement("a")
    link.href = "#"
    link.text = params[0]
    if (kind == 'pdf-download-link') {
        image.src = "../../assets/img/pdfIcon.png"
        colNode0.appendChild(image)
        link.addEventListener('click', function (event) {
            event.preventDefault()
            fn(params[0], service)
        })
    }

    colNode1.appendChild(link)
    divNode.appendChild(colNode0)
    divNode.appendChild(colNode1)
    document.getElementById('functionBar')!.appendChild(divNode)

}

export function removeSpinner() {
    // const spinner = document.getElementById('spinnerList')!
    const spinner = document.getElementById('spinnerDiv')!
    while (spinner.hasChildNodes()) {
        spinner.removeChild(spinner.firstChild!)
    }
}

export function pickleError(obj: any) {
    var msg = 'Unknown condition'
    if (obj && obj.error && obj.error.message) msg = obj.error.message
    else if (obj && obj.message) msg = obj.message
    else msg = JSON.stringify(obj)
    return msg
}

export function addStyles0(elem: any, styles: any) {
    Object.assign(elem.style, styles)
}

export function getControlCompliantDateFmt(date: Date) {
    // 1990-08-01
    var year = date.getFullYear()
    var month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : '0' + month
    var day = date.getDate().toString()
    day = day.length > 1 ? day : '0' + day
    return `${year}-${month}-${day}`
  }

export function cloneDoc(toInject: string) {

    var docTemplate = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        ${toInject}
        </body>
        </html>`
    return (new DOMParser).parseFromString(docTemplate, "text/html")
}

export function reformatForPrint() {

    const addStyles = (el: any, styles: any) => Object.assign(el.style, styles)

    var document2 = cloneDoc(document.body.innerHTML)

    var styleMap = getStyleMap()

    // special case - TH and TD
    let tHtD = {
        "border-bottom": "1px solid gray",
        "padding": "0.4rem",
        "text-align": "center"
    }

    var ths = document2.querySelectorAll("tbody td")
    for (let i = 0; i < ths.length; i++) {
        var thElem = ths[i]
        addStyles(thElem, tHtD)
    }

    // special case - LABEL
    var labels = document2.querySelectorAll("label")
    for (let i = 0; i < labels.length; i++) {
        var label = labels[i]
        addStyles(label, { "font-weight": 600, "font-size": "110%" })
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    // special case - Address
    const addressLines = document2.querySelectorAll("div.address-items > p")
    for (let i = 0; i < addressLines.length; i++) {
        var line = addressLines[i]
        addStyles(line, { "font-size": "80%", "margin-left": "0.7rem" })
    }

    // The rest
    var allElements = document2.querySelectorAll('body *')
    for (let i = 0; i < allElements.length; i++) {
        var element = allElements[i]
        var clazzName = element.className
        clazzName = clazzName
            .replace(' collapsible', '')
            .replace('collapsible ', '')
            .replace(' collapsible ', '')
            .replace('ng-untouched ng-pristine ng-valid', '')
            .replace(' lefted with-icon', '')
            .replace('lefted with-icon ', '')
            .replace(' lefted with-icon ', '')
            .replace('address-items', '')

        element.className = clazzName

        // special case
        if (element.className == 'summaryInfoGroup') {
            addStyles(element, { "margin-left": "1.2rem" })
        }

        if (element.className == 'ombutton-link' || element.className == 'ombutton') {
            addStyles(element, { display: 'none' })
            continue
        }

        element.className = clazzName.replace(' collapsible', '').replace('collapsible ', '').replace(' collapsible ', '')
        for (const [key, value] of Object.entries(styleMap)) {
            if (key == clazzName) {
                addStyles(element, value)
                element.className = ''
                break
            }
        }
    }

    var detail = document2.getElementsByClassName('detail')[0]

    if (detail) {
        var htmlCode = detail.innerHTML
        // remove Angular labels
        var re = /_ngcontent-[a-zA-Z0-9-]+=""/g
        var clazzTag = /class=""/g
        var newhtmlCode = htmlCode
            .replaceAll(re, '')
            .replaceAll(clazzTag, '')
            .replaceAll('../../assets/img/OMformLogo.png', `data:image/jpeg;base64,${getLogo()}`)

        // <body style="font-family: Montserrat, sans-serif; font-weight: 400; font-size: 75%; line-height: 1.2;  background-size: cover; background-repeat: no-repeat; max-width: 65%;">
        var docTemplate = `<!DOCTYPE html>
        <html lang="en" style="box-sizing: border-box;">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body style="font-family: Montserrat, sans-serif; font-weight: 400; font-size: 75%; line-height: 1.2; max-width: 90%;">
        ${newhtmlCode}
        </body>
        </html>`
        return docTemplate

    } else {
    }
    return ''
}

export function getStyleMap() {
    return {
        "functional__heading": {
            "font-size": "1.5em",
            "font-weight": 300
        },
        "summary-container": {
            "display": "flex",
            "flex-direction": "column",
            "flex": 1,
            "background": "#FFFFFF",
        },
        "summary-row": {
            "display": "flex",
            "padding-left": "0.5rem"
        },
        "summary-row-other": {
            "display": "none"
        },
        "overview": {
            "display": "flex",
            "align-items": "center",
            "border-bottom": "1px solid #f4f2f2"
        },
        "form-row": {
            "display": "flex"
        },
        "text-intg-summary": {
            "display": "flex",
            "flex-direction": "column",
            "flex": "1 1 150px",
            "padding-left": "0.5em",
            "padding-top": "0.5em"
        },
        "overview__subheading": {
            "font-size": "1.2em",
            "font-weight": 300,
            "text-transform": "uppercase",
            "padding-top": "0.2em",
            "padding-bottom": "0.2em",
        },
        "overview__subheading2": {
            "font-size": "1em",
            "font-weight": 300,
            "text-transform": "uppercase",
            "padding-left": "1.5em",
            "padding-top": "0.5em"
        },
        "overview__subheading2_ital": {
            "font-size": "1rem",
            "font-weight": 500,
            "font-style": "italic",
            "padding-left": "0.5em",
            "padding-top": "1em"
        },
        "form-paragraph1": {
            "font-size": "1em",
            "font-weight": 300,
            "padding-left": " 1.5em",
            "padding-right": "1.5em",
            "padding-top": "0.5em",
            "padding-bottom": "0.5em"
        },
        "form-list1": {
            "font-size": "1em",
            "font-weight": 300,
            "padding-left": "4em",
            "padding-top": "0.5em",
            "padding-bottom": "0.5em"
        },
        "form-list2": {
            "font-size": "1em",
            "font-style": "italic",
            "font-weight": 300,
            "padding-left": "2em"
        },
        "line-row": {
            "display": "flex",
            "padding-left": "1.5rem",
            "padding-right": "1.5rem"
        },
        "checkBoxGroup": {
            "display": "none",
        },
        "checkBoxGroupPrint": {
            "padding-left": "3.5em"
        },
        "data-table": {
            "width": "90%",
            "margin-left": "2rem",
            "margin-top": "1.5rem",
            "margin-bottom": "0.5rem"
        },
        "data-table-noprint": {
            "display": "none"
        },
        "data-table-error": {
            "width": "90%",
            "margin-left": "2rem",
            "margin-bottom": "1.5rem"
        },
        "text-input-highlight": {
            "display": "flex",
            "flex-direction": "column",
            "flex": "1 1 230px",
            "padding-left": "0.5em",
            "padding-top": "1em"
        },
        "highlight-1": {
            "font-weight": 500,
            "font-size": "1rem", 
            "padding-left": "0.5em",
            "font-style": "italic"
        },
        "body": {
            "font-family": "Montserrat, sans-serif",
            "font-weight": 400,
            "line-height": 1.3,
            "color": "#777777",
            "background-size": "cover",
            "background-repeat": "no-repeat",
            "min-height": "100vh"
        },
        "html": {
            "box-sizing": "border-box",
            "font-size": "68%"
        }
    }
}

export function getLogo() {
    return 'iVBORw0KGgoAAAANSUhEUgAAAO4AAABECAYAAACGaQmqAAABP2lDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSCwoyGFhYGDIzSspCnJ3UoiIjFJgf87AxSDKwMfAyqCTmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsisIs7cP49erNsQEXrMeIuTgDCmehTAlZJanAyk/wBxYnJBUQkDA2MCkK1cXlIAYrcA2SJFQEcB2TNA7HQIew2InQRhHwCrCQlyBrKvANkCyRmJKUD2EyBbJwlJPB2JDbUXBNg9AhSMTNIIuJQMUJJaUQKinfMLKosy0zNKFByBIZSq4JmXrKejYGRgZMzAAApviOrP58HhyCiRhBBLLWZgMD4CFHREiGW+ZmDYvZCBQUgAIaZeCfTSbAaG/XcKEosS4Q5g/MZSnGZsBGHzSDEwsB74///Tf6CXExgY/p77///3jP///05jYGD+AtTrBwAe0V7Fxh4DTgAAAFZlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA5KGAAcAAAASAAAARKACAAQAAAABAAAA7qADAAQAAAABAAAARAAAAABBU0NJSQAAAFNjcmVlbnNob3QTqEZTAAAB1WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNi4wLjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj42ODwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMzg8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpVc2VyQ29tbWVudD5TY3JlZW5zaG90PC9leGlmOlVzZXJDb21tZW50PgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4Kd0ADBgAAGeJJREFUeAHtXQd4FVUW/iO9SQm9SC8BQwm9Q+i9KFWpKigsGnAFFZAFXRRZFXUFBAVBQQQFpAiELiXUICWhG3oRqdJb9j/zMi8z8+aVQBKXxz3fl7w7t8+ZOfeee9oExBKgQGFAYeCRwsATj9Rs1WQVBhQGNAwowlUvgsLAI4gBRbiP4ENTU1YYUISr3gGFgUcQA4pwH8GHpqasMKAIV70DCgOPIAYU4T6CD01NWWEgSQn3twtn0XLlHOy//KcJ0x3WzMN3h3fjnlIhm/CiLhQGfMVAQGIbYNy5fx/j925D2LZVQMwBbR6Xhk5A5lRpnHMKmPkJcGAXkCU7ulesg/dC6qJAhied5SqhMKAw4BkDiUa4l27dxJvbV+PLTcuBKxfjR82RG7H934+/Zqrj2vmYs/rn+LyUqVCsbDX8ULM5QgJzx+erlMKAwoAtBh6acK/euY3XtizHlPVLgRtXXQapXaMRfm3c1ZS/8lQMGk4aZcrTLgLIuQdXxs567VA2Wy7XcpWjMKAwoGHgoQh3bFQEBi+bY95hjYh9Mis2d3sdVXLkM+Y6Bp45juzyTpd8LSNFCtStGoq5ddsjW5q09nVUrsLAY4yBByJcETpVWDQN+H2vPerI+rap2QTf1WqFjKlS29dh7uQDO9Dnl5nAJbPwytkgUxZ82rwLXg2q4sxSCYUBhQEgQYR7N/Y++kUsw+TV8wGyyLaQMw82PtsP1XPm14pv3ruHH2Ki8OG+SERfvYxhJcrhpZIV8FSGzFr5ldu3UGbJdzixY71td1pmqQo40rIHCmZ0tHFfUZUoDDweGPCZcPdcOofguV8Cxw67x0yh4rjYZRCyxLG39xGLFN99DBzaY26TJh2i+41CUObszvwXNizGlOU/8dqNl2H6jPi8VQ/8I6iSs41KKAw8rhjwSY87LmozgieM8Ey0BYrictfXnUQrCP0saouDaMk6B1eqh96NngUyBwK3bqD0ErLIBvi6Zgv0aNjekGNJXr+KAT98gTKLvsE1d7u9pYm6VBjwVwyk9HRjwhrXX/Y91m9a4akaEJgLZ7qG4cnU8bpaaTBw73atXUhILWxv3l1Lt3uqBFp9PRo4uAui8031RPza8U2tlth95QIit6zW6tr9i962FhlPHcG+Tv9AScOObVdX5SkM+CsG4qnGcocXqJdNRTbXK9FS+LShU3/kSpfR0gMv2YdAUYNxRb70mbQ88Ox7/d4dR9rwf1PT54ECRQw5NslTR1Fq0rtYeuKQTaHKUhjwfwzYEu7xa1cQ+A13xcNRXjHQq24r1MhZwLbei4VKavlztqzC8Mg1mBOzFyELpzrq5i1osqbSO5AdOLLtSwDZa4/AOTabNhbTDtECS4HCwGOGAVvhVJVfvsVWEptX4E568/WPkOYJe45bdtQM0z7k2diyM1J4tbrXm6iXu6DbIcotnoZdW9e4LXcWZMiE2Dc+c16qhMLA44AB2x13674dvt07d71nVs9zWzdFQACCbIwvkDkrAlOnc9tuzZmj2LV9ndtyU8G1v/DzMYdNtClfXSgM+DEGXLbKs2K2aLQ19nLzizcsw/xiZdG2oIMtNlYXHe7eXRHGLEf6j9NYeOIggrPldCkTvW79uZOA+/dcytxlrDl7FG0o9HoYOHDlPFadPopwCr7mnT4GkGXvTHa+cZ5CCOWfNx3y+7s24tBfF9Gt6NMeOQm7OZ4mzodFrrUrQuonUqB4pqwonSUQZbLm9MkZYyY9r1ae4T0Y4IOK9ZEjbXpDjmtShIWvbg7HbQPuy2bJgdfKOAxg/kvnkR00vtGhad4i6FA4SL90+T1/8wYGbzdzbvo8rH25NPaS8RrVgmIW++ORvVhy8ndnbeN8nZmWRH/aIty8f9eZGxZU2fZd1CtI/TXnT+uXGF66CjoXKe28dpdYyA1l/vGDzuJSWbLhjTLVndcPk3Ah3E3nTiWsPz7kdrPHY9cLQ11uXjyClvR4A82WzABOHnH0my4DBjdoj8HBrjcgUuzMcycCfyRsDmu5EDwoyO5ef+ks4Mg+ly5mkfNgiQNKlsf2xp3cOkG8vWUFcCIGWShZ93QE0Lsz/h6nYcqU5T8as9ync+bFmNotMejpqkgptt028G9K80X6boSIC+cQ3aqnMcsl3XfjL5i6QnTpBihaxkm4A3aQCxKvrjjYW62hR8I9e/Oqy30JkcgCMiDyV2oWdutdJfi3Wo68GuGO3/8bVkeEx7c3zDc+05wav2quyYCoOvuy20Sk1WEuxuNX0KyXm5AOXbgodi7yjn7p9nfq4T2Yt3ZhfDntHJKMcCMNK0v8iF5SZJnLTh+LqJ6DuTPkMFVumr8YJtRphVe+/9yRX7Q0xlQKNdWRCyHaVPO40+77zaXMW8aO8/G7gLe6xvJXIpZi4nI+FO40oFEIChbHs3kLoQn/Lt+5hcUkxNWnjzj013xBKlJY9x6NQIaWq2nsJlHTtUgMqQwEeZN4ibh0Hrj4B0Dik0VtyE+TMGRTOLa064PK2fP4NP5eEsrP5Wq45UzEwGaq8SXzqVf/rxS2daWJaLU75nux7NRhvidF/zYEuOy4O93ZDXubItuVoX527XNhqGMROuUysGjBaTO49CTsceafJgD73TgduLSwZFzmi51A6LNxCSaHz3a0okfS8WbPI396s0/w62WqaeUb/ziOmj9P0biGYfO+RtqUKaCXJXBYr9VXcFd3J+wTw5NXNi3FtzyeCAdTZfIorOo5BPXzFPLaLxi0oC2NV26+PMq2/+CF00y7kPcO/b+GCFcXbSNnYANN6b4a2/7/iHC3X7lkM00fs/66hLpTPsB/2vQwvdiBspvFQa40afSk9rv7wh8oO5u78ZkTpvwEXXDchIC4FU6OYwk7h7bF93XaeGwu6q7bLwxHapknOYJ/LpiG5uQkjCabHjtIpMIM1JlPr90aI8rXRrEZNCUlzkJnfY4zL4+016Nbx+WRouf6xS73O2b3Rp9Uf9buHuZ6cuX62FM82KWLT39dDPDo4ISginitcEnnpZ6oGWcLr18nxe8Yyi1w/S/7rqO2I6bxJRTOmMW+PIlzXXbcE0akWQenlBip6WanGVbEWksd17dv4p9zJmFKzD5sbtJV8w7KZIh+kVXax8GHuyMwZNG3mgmknmf7Kx5Gws7eixcomOpxxxbW1hhlw1RuuBD76YaLpzuEX0WCMKNOa0Op+6Tol/9s2wfZJwwDLl9AaZ6LY2m99XdAUQqrDj03CMUm8JzFuZQLn4UzbV70aSqzSBiDy1RFhbiABSKMfHPpDz61TcxKL5aoYNvdp9toNWd4B18tXALjqjSyrZvUmaO2kE02QuZsGr61LL6Lr29dhbn12xtrJFv6CZeRbl5zydIyqC89NfgzxL41HicHf4rJXV9FyzotAJEqGnZUR+NYTTiSaeI7+IVStfQp49eHdJSS/nHjOgLmfKGd1cRu2QRiApm7AEpXqouRbXth2z9G497Qibg7bBIylHOwrqb6cRdn3K2MlsozKTDQBGU8R25p3g1PgIuRjxCYNh0+bEx7awF6O4l7498FQrwjG3fQhj/7W4Tvc7l7ByFkmWUBE6gaTqKljEKBGQPzj+4HTh+Pz8yaA1NbdY+/ZmoeBYCiOfk7wJVwuXvZwaB6rZEnzqwxL80WZcVcGPosYnsMxo3Bn2N0e1o7UWpGT8H45hQa9aaaIyWJVYfUJMxwHuwRtU3PcvzS+aBD/TY4PPAjxPIcFtWyJ94pXwcVKXwR4hKd8M6GHQE3/r3nrQuAuXfn1T/3bHakudv6KthxNmZiUGkuHvQTljPj2D2bjEXJnh5arjadNrgLUID1r53r3Y+fKx/LDM8lZj/e+20d5lKSfnTHBkM71slf2HD9+CbbSQgmA7xE1r471Z4INKgwueCN3RNhqJV8SRvCve06Ov1g/x1S3zU/LictI1a8VbYGYnu+jc3930VQxbpOAhOpaIDhpQngTqev9trLVKgUJnQZgLthYzG7blsUEaJwA7LLlC1fw7b02l03bLSl9tkTv2s5vUm4DwKygGQoUkprOvPkkQfpItHaaAYuxRznxJ+PczF0A8EFivOZ1DGVjgifg2e48xrdKHOUr4Z21EM/7iA6few3GCFxs3i3Qm1tA3mpYj0Tet7ZTDXg3wCuhCtnSQu0qFATQpy+gISpEX3hyYH/QdNaTRGUJj2Zsvjz8D1R+wSwLzrUh/cZTmIfgpdLhmg7qi/9T6zcwLbaHXfnX2ttWloJlGBYnQeF+uKaKHDDjeDCUZos/0Oo1NeAbo+eYGPjzg6XSr2S1P/TwOoTH1Hi4KEAA0Qnb6CDHGUqOoV/QsAmru/UUSwyGFkkF/pcCVcEUBYYQmV/QkHY6Rb5iiKYL/ktA1HdocFGVhoptOY5tnKgbzpI49haZA1G2XhgIIsrYOQCEtqXUc+a0LaJXd+dEYZ1HAluMLNNL2a7Pl/Jm0L9tDfLKmuf/ngtwQ/Dt5uPHTMMwjHxgsv1dGXTrbeitVlyQ7zUSB85hYWWySbXzvWUXurTrwQ77yY2zFRUS5RHIxt7hcKRVDzzLvh1EbLycP8iY1N9QsR4ik1lHbRWkTJYb7GWSpPC9Vas7bRrEaTduIYYg+TStp6HzP26MMdGJ+2hWZIUHdbvg4Izb9CFeHuvUh0Xq6pcFWqgV/Fy3pqbdiGp7I0HC7DZBMTQJjHhbkA8N6f1azOmy3iWOnfjFnOpN3oXz/zGaKUUykZQjy9/OpRKlx4GXgWI3qFZWMlRLrnA9W23Cn8KFPM4l6kHd6L3oulA3sIYHRQC3fRPb5SNqqALt6/rlzhPVdKTukqIkuCvaOr31cZw9KjeCLe4G8/avAq1y1V1Cenq7ICJDrRwsvoJZ7LO29jAmOZOL8HpJh7ZjwnVmxpLfE5HHzuo1W2Xp6DPbZKq4vo4U83QfIV9GmJDo87IepCSdd1ohSzybqrtHgTWe5Hkn+UCaQU7YrbWSch17H0L4XqZkxY95c4d0xDGrep9qwqIR6sR86ea6rtc8L19jez1ogYOKb9LeRJkGOfs6F4nqrjBOuTObxpWDMdFYV964Td4iXGiBohklbpE0D727bmTtV3W2aBkOXzIw/w5qn90OEjpb3kahz/XoF38WYE72DQaRMxaNV9TTayjcvvfOzdoY7xMC6fI82f05tpv7ZyuHECgwTrLVNly8R4V+hoc2u3yaRRLVdtLMRzXbakHlTazTLYNkjDzh5hop+HKCBvbb7uhhWX+vk1vFgnLHICprX1nkYP0s73eMaN83jIY6+vZ+u9URjkxAeUkJUQKnohQ1hoF5cxxbfdzN8SM37loWXb9YDpvCIi/OM6edNfUY/5ierMlZ0glV8K1RLIIMghxTnE1yz7lXbz502TS6Vptt7y2k4RrBbIXn3R4GbFdwigECsRJwyp49tpVLVzNd7QA2vHKKM0+2NpcFoJh877SxviSZokVxw/HN4d2OquVpKeMFXL7yLYOfLoKIPdE/VspGi4kBORbR631NjRmr5WLu/ffBGIm2nnxt47R6QBhNTP1NC3xbClNljk/hY49i/nAIsd11scqib96BQMsahN9XHlXplvLCpZA+hSp9CqJ8vs8n4MJKFRqIE4ENiCLTF+JUGoEvgtVc+bTcjo+zFmV9zsmGVVDLqxyiYxPgnuKE8ToQId887/ibkNPHK68zcpWxRLZfY6KGsLArnBVPdB3BIqTYHWI+euynuSOGp+Wnfduz7eQkg4KkNXOCFyZQykEWCVK8N+j0WvOl6hDYwxRF2kPXyJk8LysAc+tYg7oC0jbj2gP/PqPE6lL3o6hRVd7VHUZ+5SPlcm5XaJzbG7axViUrGlR+meWiJt/khMhp7G/RcKlwcIyJ/Sja31KhWCgqOsMJqaTV/yIvYwTNpYqwIqBeXGG50PRD4dphh1mqfv4Kg0SHU+asPIpHucMwRqOMtRvwJ2bWMkAhFWz52WIpLtYQTPXrjIn7shG6Fa5nqbmiaaTBfYbOYQADGn1PIzvv7GdpAfv2a5xmnr+u1QNjapQV790/b11C2Ju6w2CsmSHCHc9gQvhhpBgjISrcxWalZC4dNGAYl3X15y7TcD341ycAwLTZDCNGcUH6wSLLbToImEJMieEodvfysuV8ssRGsLfjFyj6Xq1vvSJyUVmvkwJAHGJ+4A7+DlaHI1e+B220FBkYWgHtyovMaesRNfEQ5HrtFEGNelo+3WGBEzhgatqQeTFo+kcF1AK+aZ16KtxNQntUA+hm5B2suiN5BHHdObjDifyhuoSUFC8mozPxdh5oRLoS8JPCljcqCNaTHmfY8fGd79nGxrwzzEnyTeU6bVIIP+t2kS76sfP6JjmTlPLDyqG6jVtf0NzFUKlvZEsi+ubtuOyaLWnbYItnD5m/+kdS+V32vTESE8LAOu7EG4wb8bJQJKoCsUZRPyuO9dTeqsHO5fxCjN8TYwkKDAS5/fJ9BW1fjZkvbil6UApqHhdGFmmA9wxSkjI1YxcZXZtprgyJbLHsb5C2Jl5zr7MlXJPHNFrBhxi3K0LWKznHH0sD7/HWr2AdCKkoAXXCnrbpIuORO2g8miZpzAa5yuC21yll586ggVcIbdEc2XVdpkAdOeL+1Hlhm57/vjEYWT0Fi8rrrVY4lglkaNo0WRU8YjAbhPP+GvPniK3w/OXvttR2j/7mb4e/WHdTvIhCsSabYS4XtpFSXFHtPTBjmr7orazPcTQbps2p4FJi1rNsHjdL6513M2JnOF8WvtJZFI5dqyN3GBqO87G9dRUgRdi1QcSOGiJpsMzdLeMdUe4eqVE+HUh3IrZczu77d+kk9N/s16eQrRJTqs5GKT8cTwONOmMrXS6j9mzRas/okIt/IsP1RaEDdGBq+IeegQZvyckbHVs9zdw7uZ15Ny7Q3M6aL5ytvYJk+E0mbxMohLowVVbQEwgI54PQ/WpY+i9cRW1GB42oSAGJfc69MOo4uswUjyFLp7Duo3LIXvqELvOuHj81PQ596up3oZn/lF253693PBbvNsgF8IdvWC6oYZNkseCTjUa4wvuFJ7YOJuWiZZ1o0N/dFu3AD8KoRh09LYD8Ay6mzpiq5+2bd2HyFzQ4FkM46bzvgQk4HvkEahZCG/dC42oCREYtWu9uQ03q34+Bt4XAg8zEK58D0u+B53UoYNdCLdqIA/q3DGGt3jOxK/LLtq/flt8IdEiuEuV4PnQySJwhRlatpaGBNt/lwysMivs5U5pJFy9jRgADKLh/MeLZyCcX//LuX4Zi+LYkKeKYlCcf6zUr5YjP7b0fhtVZnyCOowK8SAgC4AsNgPpLSNG5ctPH8GMU0dpXH6M7HtqZMjzFHpzB26UtxBkVdfYejcDdaUl2HLDouemmilb322Fu8hRvrqpTL/IyEB8NbJmR+VsuVE5Rx6Uy5rL63m+M1V4n98lBxMHnbyo9PR68tuIKq71hrm0tYngKYveHH5R8UBIHXwWvQ2r/zyNaLHCukhnfwomJc52B+5GXfhetCvohm00DmpItyQ7vTlv/PtSLTvfRx9AnuVohucJK10VH0dvwmoGHNgiMgAJsiCupMRfS37ytXX+oprO2sjViNbDiP8w6ruN8b49DS8EPp7mpBcNoYYliowQrhWXnvoxllXgXL2BbZTHTedOaIRh13jwtpUYu26Jg02lQEjMwfY16+7CHuttj5I1LvSfMP1S++3buCMm1mhmyjNeOMbgai5qJrIyBctUxnbqGu12GPE0usqX1JONs7FvlVYY8AcM2BKuLzd24voVzUTOXbQGvQ/N55ahVkxA/a6oijyBnGNPUvmdm+opX1c/T/2pMoUBf8IAxYDeQYRJS04e0iRmem0J8+KNaKXukKitepP4Xyru5TzrCYT1KUDBl060e3luECstWTAUKAw87hhwOeMaESKWJB0j1zgCuGkf2qLqhrtlRMNn3LLSxvZySDdGBXSWsS8ROnlil/W68imUFxl9cF7EcoDRNTSLnwKF8QYDn42gP6qv+lu9P/WrMOAPGPBIuNpudzjaEESMgiJGO6wuX5KnhHckiUc+Ou1OJ9hs7QJNRWSHqC83LsWYyqG24WaETf6ZwqKBv23AUVHFmJzkOYfjMThEAUK6VDTCUKAw8BhiwOsZV/suLgOSWS1OnLgSiyWR6jK4eXtKEytRIlaeUQIOU+c6YPYEs1Lb2ciRkE9vjqPFzSEaaGyj9G89//ZSVQSJ7ax7vVjaSMyrT6igDqMkWIHCwOOKAa+EK4gR4+kqy2a6uIMlO9KoS93Gr91riu9kH1wNqDDw/4MBnwhXn+6k/ZHoy9CkyR5cjKZ0ofTrXRj6jMniSp+X+lUYeNwwkCDCFeSI10e+pTMcponJgS0aHSyklUtLGkAoUBhQGHBgIMGEqyNOPiz13C8kYLFMSQrg2blr7eb4umZLt8b/STGs6lNh4FHAwAMTrtycuJf1i1iCqWKzapL8PsytU+X0dEVEN+qU7F8KeJhZq7YKA8mJgYciXH2iwj6/QF3r0q1rNCcEPT9hv6IjLosVddugQZzxd8Laq9oKA48PBhKFcHV0id3wW5GrMUW+Zi92xr4AWeJiwVUxvVpjk7ugL01VHYWBxxUDiUq4OhIlkt83NE98Sb6BemC3vREGVTuvhtTG0OBayMmoeQoUBhQGfMdAkhCucXixLf4oajPGiYM8nfElHI0ENktIjCRjfyqtMKAwQMPfWIJChMKAwsCjhQGfvIMerVtSs1UY8H8MKML1/2es7tAPMaAI1w8fqrol/8eAIlz/f8bqDv0QA4pw/fChqlvyfwwowvX/Z6zu0A8xoAjXDx+quiX/x4AiXP9/xuoO/RADinD98KGqW/J/DCjC9f9nrO7QDzHwPzbChmy+EZ2nAAAAAElFTkSuQmCC'
}

