import { register } from "../services/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
        mutationFn:register,
        onSuccess:(data)=>{
            console.log("SUCCESS 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥🐦‍🔥👩‍🚒👩‍🚒👩‍🚒")
            console.log("this is data :"+data)
        },
        onError:(error)=>{
            console.log("response failed with error :"+ error)
        }
    })
}