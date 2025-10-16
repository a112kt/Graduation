import { login } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
export function useLogin() {
  return useMutation({
        mutationFn:login,
        onSuccess:(data)=>{
            console.log("responnse  success and data is ")
            console.log(data)
        },
        onError:(error)=>{
            console.log("response failed with error "+error)
        }
    })
}