

export function setCookie(cookie_name, cookie_value, timeout_days) {
    const date = new Date();
    date.setTime(date.getTime() + (timeout_days * 24 * 60 * 60 * 1000));
    let expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cookie_name}=${cookie_value}; ${expires}; SameSite=None; path=/; Secure`
}

export function getCookie(cookie_name) {
    const cookie = document.cookie.split("; ").find((cookie) => cookie.startsWith(`${cookie_name}=`))

    if (cookie !== undefined) {
        return cookie.split("=")[1];
    }
    return ""
}

export function deleteCookie(cookie_name) {
    document.cookie = `${cookie_name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export function formatDateTime(date_time) {
    let newDateTime = date_time.split("T")
    if (newDateTime.length !== 2) {
        return date_time
    }
    
    let date = newDateTime[0]
    let time = newDateTime[1]
    time = time.split(".")[0]

    return `${date} ${time}`
}

// export function verifyUser() {
//     const cookie = getCookie("name")
//     const role = getCookie("role")

//     if (!cookie) {
//         redirect("../../")
//         return
//     }

//     if (!role) {
//         redirect("../staff-login")
//     }
// }