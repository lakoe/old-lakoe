import { useToast } from "@/components/use-toast";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from 'axios';
import { SubmitHandler, useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

type loginForm = {
    email: string,
    password: string
}

const loginSchema = z.object({
   email: z.string(),
   password: z.string() 
})

export const useLoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        
        formState: { errors, isSubmitting, isSubmitSuccessful },
      } = useForm<loginForm>({
        mode: "onChange",
        resolver: zodResolver(loginSchema),
      });

    //   useEffect(() => {
    //     localStorage.removeItem('token');
    //   },[])

        const onSubmit: SubmitHandler<loginForm> = async(data) => {
        try {
            const response = await Axios({
                method: "post",
                url: `${api}/form-produk`,
                data: data,
                headers: { "Content-Type": "application/json" },
                })
            // handle success
            // const token = response.data.user.token;
            // const user = response.data.user.user;
            // if (token) {
            //     localStorage.setItem("token", response.data.user.token);
            // }
            // if(user)
            //     {
            //         dispatch(SET_USER(user));
            //         toast({
            //             title: "Login success!",
            //             status: "success",
            //             duration: 3000,
            //             isClosable: true,
            //           });
            //         navigate("/");
            //     }
            } catch (error : any) {
            // handle error
            // toast({
            //     title: error.response.data,
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            //   });
            console.log(error);
            }
        }
    
          return {
            register,
            handleSubmit,
            onSubmit,
            errors,
            isSubmitting,
            isSubmitSuccessful
          }
}
