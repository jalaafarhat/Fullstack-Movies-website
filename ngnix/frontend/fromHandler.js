/******************************************************************************************/
async function fetchJson(urlApi, reqBody) {
    const URL = "http://localhost/api" + urlApi;
    const res = await fetch(URL, {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await res.json();
}

function setSession(sid) {
    // Save the session ID in a cookie 
    document.cookie = `sessionId=${sid}; path=/`;
}

function getSession() {
    const cookies = document.cookie.split(';');
    let sessionId = null;
    cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'sessionId') {
            sessionId = value;
        }
    });
    if (sessionId) {
        // The session ID is valid and has not expired
        return sessionId;
    } else {
        // The session ID is either invalid or has expired
        return '';
    }
}



//sign in btn
let signin = document.getElementById('signin');
signin.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('signin-form').classList.toggle('show');
})

document.getElementById('signin-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const emailInput = document.getElementById('email2');
    const passwordInput = document.getElementById('password2');
    const email = emailInput.value;
    const password = passwordInput.value;
    const resData = await fetchJson("/login", {
        email: email,
        password: password,
    })
    // if response is isAccepted
    if (resData.isAccepted) {
        userData = {
            isLogin: true,
            userName: resData.username,
            email: resData.email,
            proUser: resData.ispro,
        };
        setSession(resData.sid);
    }
    else {
        alert("Your SignIn is failed!")
    }
    document.getElementById('signin-form').classList.toggle('show');
    initData();
});


//register btn
let register = document.getElementById('register');
register.addEventListener('click', (event) => {
    event.preventDefault();

    document.getElementById('register-form').classList.toggle('show');
})

document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const resData = await fetchJson("/register", {
        username: name,
        email: email,
        password: password,
    });
    console.log(resData);
    // if response is isAccepted
    if (resData.isAccepted) {
        userData = {
            isLogin: true,
            userName: resData.username,
            email: resData.email,
            proUser: false,
        };
        setSession(resData.sid);
    } else {
        alert("Your register is failed!")
    }
    document.getElementById('register-form').classList.toggle('show');
    initData();
});

// delete account btn
let deleteUser = document.getElementById('deleteUser');
deleteUser.addEventListener('click', async () => {
    const resData = await fetchJson("/deleteUser", {
        sid: getSession(),
    });
    if (resData.isAccepted) {
        // clear user context
        userData = {
            isLogin: false,
            userName: "",
            email: "",
            proUser: false
        };
        document.cookie = `sessionId=; path=/`;
        logout.style.display = 'none';
        signin.style.display = 'block';
        register.style.display = 'block';
        proUserMark.style.display = 'none';
        goPro.style.display = 'none';
        updateEmail.style.display = 'none';
        deleteUser.style.display = 'none';
    }
    else {
        alert("Failed to delete your account");
    }
})

//logout btn
let logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    // clear user context
    userData = {
        isLogin: false,
        userName: "",
        email: "",
        proUser: false
    };
    document.cookie = `sessionId=; path=/`;
    logout.style.display = 'none';
    signin.style.display = 'block';
    register.style.display = 'block';
    proUserMark.style.display = 'none';
    goPro.style.display = 'none';
    updateEmail.style.display = 'none';
    deleteUser.style.display = 'none';
})

let proUserMark = document.getElementById('proUserMark');
let goPro = document.getElementById('goPro');
// Add pro movies
goPro.addEventListener('click', async (event) => {
    event.preventDefault()
    getPro();
    userData.proUser = true;
})

// run this code when ever the page restart
async function initData() {
    const req = {
        sid: getSession(),
    };
    //if there is no session or it has expired
    if (req.sid === "") {
        logout.style.display = 'none';
        signin.style.display = 'block';
        register.style.display = 'block';
        proUserMark.style.display = 'none';
        goPro.style.display = 'none';
        updateEmail.style.display = 'none';
        deleteUser.style.display = 'none';
        return;
    }

    const resData = await fetchJson("/data", req);
    if (resData.isAccepted) {
        userData = {
            isLogin: true,
            userName: resData.username,
            email: resData.email,
            proUser: resData.ispro,
        };
    }

    if (userData.proUser) {
        if (resData.isAccepted) {
            if (global_data.length === 6)
                global_data = global_data.concat(JSON.parse(resData.proContent));
            handleData(global_data);
        }
        else {
            alert("Your go pro request is failed!")
        }
    }
    // show buttons based if user login or not
    if (userData.isLogin) {
        logout.style.display = 'block';
        signin.style.display = 'none';
        register.style.display = 'none';
        updateEmail.style.display = 'block';
        deleteUser.style.display = 'block';
        if (userData.proUser) {
            proUserMark.style.display = 'block';
            goPro.style.display = 'none';
        }
        else {
            proUserMark.style.display = 'none';
            goPro.style.display = 'block';
        }
    } else {

        logout.style.display = 'none';
        signin.style.display = 'block';
        register.style.display = 'block';
        proUserMark.style.display = 'none';
        goPro.style.display = 'none';
        updateEmail.style.display = 'none';
        deleteUser.style.display = 'none';
    }
    console.log(userData.isLogin);
}

async function getPro() {
    const req = {
        sid: getSession(),
    };
    if (!userData.proUser) {
        const resData = await fetchJson("/goPro", req);
        if (resData.isAccepted) {
            if (global_data.length === 6)
                global_data = global_data.concat(JSON.parse(resData.proContent));
            handleData(global_data);
            initData();
        }
        else {
            alert("Your go pro request is failed!")
        }
    }
}


// update account email
let updateEmail = document.getElementById('updateEmail');
updateEmail.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('update-form').classList.toggle('show');

})
document.getElementById('update-form').addEventListener('submit', async (event) => {
    const email = document.getElementById('email3').value;
    const req = {
        sid: getSession(),
        email: email
    }
    const resData = await fetchJson("/updateEmail", req);
    if (resData.isAccepted) {
        alert("Your Email is updated");
    }
    else {
        alert("Your Email is failed update");
    }
    document.getElementById('update-form').classList.toggle('show');
})

initData();
