import { useMutation } from "@tanstack/react-query"
import { verification } from "../services/auth"
import { AxiosError } from "axios";
export default function useVerificaion() {
return useMutation({
    mutationFn:  verification,
    onSuccess: (data) => {
        console.log(data)

    },onError:(error:any)=>{
        console.log(error.response.data)
    }
})
}
