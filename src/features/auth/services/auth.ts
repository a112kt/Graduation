import { apiCall } from "../../../../services/apiClient";
type loginData={
    email:string;
    password:string;
}
export async function login(data:loginData) {
    const res = await apiCall.post("/todos/",data)
    return res.data

}