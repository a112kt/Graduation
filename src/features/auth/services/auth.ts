import { AxiosError } from "axios";
import { apiCall } from "../../../../services/apiClient";
type loginData={
    email:string;
    password:string;
}
type registerData ={
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Password: string;
  DateOfBirth: string;
  Gender: string;
  ProfileImage?: string;
}
type verigicationData={
  email:string;
  otp:string;
}
//Login function
export async function login(data:loginData) {
    const res = await apiCall.post("/api/Auth/Login",data)
    return res.data
}
//Register function
export async function register(data:registerData) { 
  const form = new FormData();
  form.append("FirstName", data.FirstName);
  form.append("LastName", data.LastName);
  form.append("Email", data.Email);
  form.append("PhoneNumber", `+20${data.PhoneNumber}`);
  form.append("Password", data.Password);
  form.append("DateOfBirth", data.DateOfBirth);
  form.append("Gender", data.Gender);
  form.append("ProfileImage", {
      uri: data.ProfileImage,
      name: "profile.jpg",
      type: "image/jpg",
    } as any);
    // NOTE : we had to use fetch instead of axios because axios has some problems and limitations with form data in react native
   const resp = await fetch("https://alluvo-api-stating.runasp.net/api/Auth/Register", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      body: form,
    })
  return await resp.text()
}
//Verify Account function
export async function verification(data:verigicationData) {
  const res = await apiCall.post("/api/Otp/VerifyOtp",data)
  return res.data
}
// Resend OTP function
export async function resendOtp(email:string) {
  const res = await apiCall.post(`/api/Otp/ResendOtp?email=${email}`)
  return res.data

}