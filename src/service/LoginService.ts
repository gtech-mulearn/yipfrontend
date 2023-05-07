import { apiPublicGateway } from "./apiGateway"

export const passHandleChange = (event: React.ChangeEvent<HTMLInputElement>, setPassword: Function) => setPassword(event.target.value)
export const emailHandleChange = (event: React.ChangeEvent<HTMLInputElement>, setEmail: Function) => setEmail(event.target.value)

export const passShowEvent = (event: React.ChangeEvent<HTMLInputElement>, setShowPassword: Function) => setShowPassword(event.target.checked)

export const sendLogin = (email: string, password: string, setErrorStatus: Function): void => {
    const postData: any = {
        email: email,
        password: password,
    }
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
    }
    const createData = async () => {
        apiPublicGateway.post("/api/v1/yip/login/", postData)
            .then((res) => res.data)
            .then((data) => {
                setErrorStatus(false)
                localStorage.setItem("accessToken", data.response.accessToken)
                window.location.replace("/school-dashboard")
            })
            .catch((err) => {
                setErrorStatus(true)
                console.error(err)
            })
    }
    createData()
}