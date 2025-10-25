import { login } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
export function useLogin() {
  return useMutation({
        mutationFn:login,
        onSuccess:(data)=>{
            console.log("responnse  success and data is ")
            // console.log(data.data.token)
        },
        onError:(error:any)=>{
            console.log(error.response.data?.message.en)
        }
    })
}